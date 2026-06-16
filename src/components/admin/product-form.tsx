'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useStorage } from '@/firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { editProductImage } from '@/ai/flows/edit-image-flow';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
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
import { Loader2, X, Upload, Wand2, Info } from 'lucide-react';
import Image from 'next/image';

const productSchema = z.object({
  name: z.string().min(2, 'Please enter a name.'),
  brand: z.string().min(2, 'Please enter a brand.'),
  price: z.coerce.number().min(0, 'Price must be 0 or more.'),
  oldPrice: z.coerce.number().optional(),
  category: z.string().min(1, 'Please select a category.'),
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
    defaultValues: {
      name: initialData?.name || '',
      brand: initialData?.brand || '',
      price: initialData?.price || 0,
      oldPrice: initialData?.oldPrice || undefined,
      category: initialData?.category || 'Laptops',
      type: initialData?.type || 'laptop',
      status: initialData?.status || 'New',
      description: initialData?.description || '',
      inStock: initialData?.inStock !== undefined ? initialData.inStock : true,
      specifications: {
        processor: initialData?.specifications?.processor || '',
        ram: initialData?.specifications?.ram || '',
        storage: initialData?.specifications?.storage || '',
        display: initialData?.specifications?.display || '',
      },
      imageUrls: initialData?.imageUrls || [],
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    if (!db) return;
    setLoading(true);
    
    const productData = sanitizeFirestoreData({
      ...values,
      updatedAt: serverTimestamp(),
      createdAt: initialData?.createdAt || serverTimestamp(),
      // Ensure imageId is set to the first image if available for backward compatibility
      imageId: values.imageUrls[0] || '',
    });

    try {
      if (productId) {
        await setDoc(doc(db, 'products', productId), productData, { merge: true });
        toast({ title: 'Saved!', description: 'Product has been updated.' });
      } else {
        await addDoc(collection(db, 'products'), productData);
        toast({ title: 'Added!', description: 'New product added to shop.' });
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
      
      const currentImages = form.getValues('imageUrls');
      form.setValue('imageUrls', [...currentImages, url], { shouldDirty: true });
      
      toast({ title: 'Uploaded!', description: 'Photo added successfully.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Could not upload photo.' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeBackground = async (index: number) => {
    const imageUrl = form.getValues('imageUrls')[index];
    if (!storage || !imageUrl) return;

    setProcessingIndex(index);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      const dataUri = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      const { editedImageDataUri } = await editProductImage({
        imageDataUri: dataUri,
        prompt: "Remove the background from this image. Make it purely white. Keep only the laptop or accessory with very high detail.",
      });

      const res = await fetch(editedImageDataUri);
      const processedBlob = await res.blob();
      const storageRef = ref(storage, `products/cleaned_${Date.now()}.png`);
      const snapshot = await uploadBytes(storageRef, processedBlob);
      const newUrl = await getDownloadURL(snapshot.ref);

      const current = [...form.getValues('imageUrls')];
      current[index] = newUrl;
      form.setValue('imageUrls', current, { shouldDirty: true });

      toast({ title: 'AI Clean Done!', description: 'Background removed successfully.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'AI Clean Failed', description: 'Could not clean image.' });
    } finally {
      setProcessingIndex(null);
    }
  };

  const removeImage = (index: number) => {
    const current = [...form.getValues('imageUrls')];
    current.splice(index, 1);
    form.setValue('imageUrls', current, { shouldDirty: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary border-b pb-2">Step 1: Basic Details</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="text-xs font-bold uppercase">Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. HP EliteBook 840 G8" {...field} className="h-12 border-2 border-zinc-100 focus:border-primary" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            
            <FormField control={form.control} name="brand" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">Brand</FormLabel>
                <FormControl>
                  <Input placeholder="HP, Dell, Lenovo..." {...field} className="h-12 border-2 border-zinc-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-2 border-zinc-100">
                      <SelectValue placeholder="Choose category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Laptops">Laptops</SelectItem>
                    <SelectItem value="Tablets">Tablets</SelectItem>
                    <SelectItem value="Printers">Printers</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Monitors">Monitors</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="price" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">Price (KSH)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="h-12 border-2 border-zinc-100" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="status" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">Condition</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-2 border-zinc-100">
                      <SelectValue placeholder="Choose condition" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="New">New (Sealed)</SelectItem>
                    <SelectItem value="Boxed">Open Box</SelectItem>
                    <SelectItem value="Ex-UK">Ex-UK (Refurbished)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        </div>

        {/* Images */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b pb-2">
            <h3 className="text-xs font-black uppercase tracking-widest text-primary">Step 2: Product Photos</h3>
            <Button 
              type="button" 
              onClick={() => fileInputRef.current?.click()} 
              disabled={uploading}
              className="bg-black text-white font-bold uppercase text-[10px] tracking-widest px-6"
            >
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="mr-2 h-4 w-4" />}
              {uploading ? 'Uploading...' : 'Add More Photos'}
            </Button>
            <input type="file" className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </div>

          <p className="text-[10px] font-bold text-zinc-400 uppercase italic">
            Tip: Use the AI button to make your photos look professional with a white background.
          </p>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-5">
            {form.watch('imageUrls').map((url, i) => (
              <div key={i} className="group relative aspect-square rounded-2xl border-2 border-zinc-50 bg-white p-2 overflow-hidden shadow-sm">
                <Image src={url} alt={`Product ${i + 1}`} fill className="object-contain p-2" />
                
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="secondary" 
                    className="h-9 w-[80%] text-[9px] font-black uppercase tracking-tighter"
                    onClick={() => removeBackground(i)}
                    disabled={processingIndex === i}
                  >
                    {processingIndex === i ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Wand2 className="mr-2 h-3.5 w-3.5" />}
                    AI Clean BG
                  </Button>
                  <Button 
                    type="button" 
                    size="sm" 
                    variant="destructive" 
                    className="h-9 w-[80%] text-[9px] font-black uppercase tracking-widest"
                    onClick={() => removeImage(i)}
                  >
                    <X className="mr-2 h-3.5 w-3.5" /> Remove
                  </Button>
                </div>
                {i === 0 && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                    Main Photo
                  </div>
                )}
              </div>
            ))}
            {form.watch('imageUrls').length === 0 && (
              <div className="col-span-full py-12 text-center border-2 border-dashed border-zinc-100 rounded-3xl">
                <p className="text-xs font-bold text-zinc-300 uppercase tracking-widest">No photos uploaded yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Specifications */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary border-b pb-2">Step 3: Technical Specs</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField control={form.control} name="specifications.processor" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">Processor (CPU)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Intel Core i7 11th Gen" {...field} className="h-12 border-2 border-zinc-100" />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="specifications.ram" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">Memory (RAM)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 16GB DDR4" {...field} className="h-12 border-2 border-zinc-100" />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="specifications.storage" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">Storage (SSD/HDD)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 512GB Fast SSD" {...field} className="h-12 border-2 border-zinc-100" />
                </FormControl>
              </FormItem>
            )} />
            <FormField control={form.control} name="specifications.display" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">Screen Size</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. 14 inch Full HD" {...field} className="h-12 border-2 border-zinc-100" />
                </FormControl>
              </FormItem>
            )} />
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-6">
          <h3 className="text-xs font-black uppercase tracking-widest text-primary border-b pb-2">Step 4: Final Details</h3>
          <div className="space-y-6">
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-bold uppercase">About this product</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Tell your customers more about this item. Keep it simple and helpful." 
                    className="min-h-[120px] border-2 border-zinc-100 p-4 font-medium" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )} />

            <div className="flex items-center justify-between p-6 rounded-2xl bg-zinc-50 border-2 border-zinc-100">
              <div className="space-y-0.5">
                <FormLabel className="text-xs font-black uppercase tracking-widest">In Stock</FormLabel>
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Is this item available to buy right now?</p>
              </div>
              <FormField control={form.control} name="inStock" render={({ field }) => (
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
              )} />
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button 
            type="submit" 
            size="lg" 
            className="w-full h-16 rounded-2xl bg-black text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all shadow-xl disabled:opacity-50" 
            disabled={loading || uploading}
          >
            {loading ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : null}
            {productId ? 'Update Shop Listing' : 'Publish Product to Shop'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
