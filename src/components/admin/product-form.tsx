'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useStorage } from '@/firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { editProductImage } from '@/ai/flows/edit-image-flow';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { ImageIcon, Loader2, X, Upload, Sparkles, Wand2 } from 'lucide-react';
import Image from 'next/image';

const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  brand: z.string().min(2, 'Brand is required'),
  price: z.coerce.number().min(0),
  oldPrice: z.coerce.number().optional(),
  category: z.string().min(1, 'Category is required'),
  type: z.enum(['laptop', 'accessory']).default('laptop'),
  status: z.enum(['New', 'Ex-UK', 'Boxed']).optional(),
  description: z.string().optional(),
  inStock: z.boolean().default(true),
  specifications: z.object({
    processor: z.string().optional(),
    ram: z.string().optional(),
    storage: z.string().optional(),
    display: z.string().optional(),
  }).optional(),
  imageUrls: z.array(z.string()).default([]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  productId?: string;
}

function sanitizeFirestoreData(data: any): any {
  if (Array.isArray(data)) return data.map(sanitizeFirestoreData);
  if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    if (data._methodName === 'serverTimestamp' || data.constructor?.name === 'FieldValueImpl') return data;
    return Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, sanitizeFirestoreData(v)])
    );
  }
  return data;
}

export function ProductForm({ initialData, productId }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const db = useFirestore();
  const storage = useStorage();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      brand: '',
      price: 0,
      category: 'Laptops',
      type: 'laptop',
      inStock: true,
      specifications: { processor: '', ram: '', storage: '', display: '' },
      imageUrls: [],
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    if (!db) return;
    setLoading(true);
    const productData = sanitizeFirestoreData({
      ...values,
      updatedAt: serverTimestamp(),
      createdAt: initialData?.createdAt || serverTimestamp(),
    });

    try {
      if (productId) {
        await setDoc(doc(db, 'products', productId), productData, { merge: true });
        toast({ title: 'Success', description: 'Product updated.' });
      } else {
        await addDoc(collection(db, 'products'), productData);
        toast({ title: 'Success', description: 'Product added.' });
      }
      router.push('/admin/products');
    } catch (error: any) {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: productId ? `products/${productId}` : 'products',
        operation: productId ? 'update' : 'create',
        requestResourceData: productData,
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !storage) return;
    setUploading(true);
    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const url = await getDownloadURL(snapshot.ref);
      form.setValue('imageUrls', [...form.getValues('imageUrls'), url], { shouldDirty: true });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: err.message });
    } finally {
      setUploading(false);
    }
  };

  const removeBackground = async (index: number) => {
    const imageUrl = form.getValues('imageUrls')[index];
    if (!storage || !imageUrl) return;

    setProcessingIndex(index);
    try {
      // Convert URL to data URI for Gemini processing
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      const dataUri = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      const { editedImageDataUri } = await editProductImage({
        imageDataUri: dataUri,
        prompt: "Remove the background from this image. Make it purely white. Keep only the product (laptop/accessory) with high detail.",
      });

      // Upload processed image back to Storage
      const res = await fetch(editedImageDataUri);
      const processedBlob = await res.blob();
      const storageRef = ref(storage, `products/ai_cleaned_${Date.now()}.png`);
      const snapshot = await uploadBytes(storageRef, processedBlob);
      const newUrl = await getDownloadURL(snapshot.ref);

      const current = [...form.getValues('imageUrls')];
      current[index] = newUrl;
      form.setValue('imageUrls', current, { shouldDirty: true });

      toast({ title: 'AI Cleanup Complete', description: 'Background removed successfully.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'AI Cleanup Failed', description: 'Could not process image.' });
    } finally {
      setProcessingIndex(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel className="text-xs font-bold uppercase">Product Name</FormLabel>
              <Input {...field} className="h-11 rounded-lg border-zinc-200 focus:ring-primary" />
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="brand" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase">Brand</FormLabel>
              <Input {...field} className="h-11 rounded-lg border-zinc-200" />
            </FormItem>
          )} />
          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs font-bold uppercase">Price (KES)</FormLabel>
              <Input type="number" {...field} className="h-11 rounded-lg border-zinc-200" />
            </FormItem>
          )} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase tracking-widest text-zinc-500">Visual Assets</h3>
            <Button type="button" size="sm" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
              {uploading ? <Loader2 className="animate-spin" /> : <Upload className="mr-2 h-4 w-4" />} Upload Image
            </Button>
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {form.watch('imageUrls').map((url, i) => (
              <div key={i} className="group relative aspect-square rounded-xl border bg-white p-2">
                <Image src={url} alt="Preview" fill className="object-contain" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 rounded-xl">
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="secondary" 
                    className="h-8 text-[10px] font-bold"
                    onClick={() => removeBackground(i)}
                    disabled={processingIndex === i}
                  >
                    {processingIndex === i ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="mr-1 h-3 w-3" />}
                    AI CLEAN BG
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="destructive" 
                    className="h-8 text-[10px] font-bold"
                    onClick={() => form.setValue('imageUrls', form.getValues('imageUrls').filter((_, idx) => idx !== i))}
                  >
                    REMOVE
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full h-14 rounded-xl bg-black font-bold uppercase tracking-widest" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : 'Save Product Listing'}
        </Button>
      </form>
    </Form>
  );
}
