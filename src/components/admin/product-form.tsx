'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore, useStorage } from '@/firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
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
import { ImageIcon, Loader2, X, Upload } from 'lucide-react';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

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
  }),
  imageUrls: z.array(z.string()).default([]),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: any;
  productId?: string;
}

export function ProductForm({ initialData, productId }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
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
      specifications: {
        processor: '',
        ram: '',
        storage: '',
        display: '',
      },
      imageUrls: [],
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    if (!db) return;
    setLoading(true);

    const productData = {
      ...values,
      updatedAt: serverTimestamp(),
      createdAt: initialData?.createdAt || serverTimestamp(),
    };

    const operation = productId ? 
      setDoc(doc(db, 'products', productId), productData, { merge: true }) : 
      addDoc(collection(db, 'products'), productData);

    operation
      .then(() => {
        toast({ 
          title: productId ? 'System Updated' : 'New Arrival Published', 
          description: productId ? 'Product changes published successfully.' : 'The product is now live.' 
        });
        router.push('/admin/products');
        router.refresh();
      })
      .catch(async (error) => {
        const permissionError = new FirestorePermissionError({
          path: productId ? `products/${productId}` : 'products',
          operation: productId ? 'update' : 'create',
          requestResourceData: productData,
        } satisfies SecurityRuleContext);
        errorEmitter.emit('permission-error', permissionError);
      })
      .finally(() => setLoading(false));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !storage) return;

    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: 'destructive', title: 'File too large', description: 'Maximum image size is 5MB.' });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error:", error);
          toast({ 
            variant: 'destructive', 
            title: 'Upload Failed', 
            description: error.message || "Please check your storage permissions in Firebase Console." 
          });
          setUploading(false);
          setUploadProgress(0);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const current = form.getValues('imageUrls') || [];
          form.setValue('imageUrls', [...current, downloadURL]);
          setUploading(false);
          setUploadProgress(0);
          toast({ title: 'Image Uploaded', description: 'The photo has been added to the gallery.' });
        }
      );
    } catch (err: any) {
      console.error("Initialization error:", err);
      toast({ variant: 'destructive', title: 'Upload Error', description: 'Could not start upload task.' });
      setUploading(false);
    }
  };

  const removeImage = (index: number) => {
    const current = form.getValues('imageUrls') || [];
    form.setValue('imageUrls', current.filter((_, i) => i !== index));
  };

  const watchedImageUrls = form.watch('imageUrls') || [];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="grid gap-8 md:grid-cols-2">
           <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Product Class</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-black border-2 border-black">
                    <SelectItem value="laptop">LAPTOP</SelectItem>
                    <SelectItem value="accessory">ACCESSORY / PERIPHERAL</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Stock Group</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="h-12 border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <SelectValue placeholder="Select Group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-black border-2 border-black shadow-lg">
                    {['Laptops', 'Desktops', 'Accessories', 'Printers', 'Networking', 'Software', 'Mouse', 'UPS'].map(cat => (
                      <SelectItem key={cat} value={cat} className="uppercase tracking-widest text-[10px]">{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Full Model Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Lenovo ThinkBook 14-IRL" {...field} className="h-12 border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Manufacturer</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Lenovo, Dell, HP" {...field} className="h-12 border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Listing Price (KES)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="h-12 border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
            Status <span className="h-px flex-1 bg-black"></span>
          </h3>
          <div className="grid gap-8 md:grid-cols-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Device Condition</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12 border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <SelectValue placeholder="Condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-black border-2 border-black">
                      <SelectItem value="New">BRAND NEW</SelectItem>
                      <SelectItem value="Boxed">BOXED (OPENED)</SelectItem>
                      <SelectItem value="Ex-UK">EX-UK (PRE-OWNED)</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-xl border-4 border-black p-6 bg-zinc-50 shadow-[4px_4px_0px_0px_rgba(0,186,242,1)]">
                  <div className="space-y-0.5">
                    <FormLabel className="font-black uppercase text-[10px] tracking-widest">Inventory Availability</FormLabel>
                    <FormDescription className="text-[10px] font-bold text-zinc-400 uppercase">Is this item ready for sale?</FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black uppercase tracking-tight flex items-center gap-2">
            Specifications <span className="h-px flex-1 bg-black"></span>
          </h3>
          <div className="grid gap-6 md:grid-cols-2">
            {['processor', 'ram', 'storage', 'display'].map((spec) => (
              <FormField
                key={spec}
                control={form.control}
                name={`specifications.${spec}` as any}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-black uppercase text-[10px] tracking-widest text-zinc-400">{spec}</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-12 border-2 border-black font-black text-sm shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0" />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-black uppercase text-[10px] tracking-widest text-zinc-400">Marketing Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[160px] border-4 border-black font-bold p-4 shadow-[4px_4px_0px_0px_rgba(0,186,242,1)] focus-visible:ring-0" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black uppercase tracking-tight">Visuals</h3>
            <div className="flex items-center gap-4">
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileUpload}
              />
              <Button 
                type="button" 
                disabled={uploading || !storage}
                onClick={() => fileInputRef.current?.click()} 
                className="bg-black text-white font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,186,242,1)]"
              >
                {uploading ? <Loader2 className="mr-2 h-3 w-3 animate-spin" /> : <Upload className="mr-2 h-3 w-3" />}
                {uploading ? `Uploading ${Math.round(uploadProgress)}%` : 'Upload from Device'}
              </Button>
            </div>
          </div>
          
          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} className="h-2 border-2 border-black" />
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {watchedImageUrls.map((url, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-xl border-4 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1">
                <Image src={url} alt={`Product View ${i + 1}`} fill className="object-contain p-2" />
                <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="rounded-lg bg-red-600 p-2 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,186,242,1)] hover:bg-red-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
            {!watchedImageUrls.length && !uploading && (
              <div className="flex h-32 flex-col items-center justify-center rounded-xl border-4 border-dashed border-zinc-200 bg-zinc-50 col-span-full">
                <ImageIcon className="mb-2 h-8 w-8 text-zinc-300" />
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">No media attached yet</p>
              </div>
            )}
          </div>
        </div>

        <Button 
          type="submit" 
          disabled={loading || uploading}
          className="h-16 w-full bg-black font-black uppercase tracking-widest text-white border-4 border-black hover:bg-primary hover:text-black shadow-[10px_10px_0px_0px_rgba(0,186,242,1)] active:translate-y-2 active:shadow-none transition-all"
        >
          {loading ? <Loader2 className="mr-3 h-6 w-6 animate-spin" /> : null}
          {productId ? 'Update Listing' : 'Publish to Shop'}
        </Button>
      </form>
    </Form>
  );
}