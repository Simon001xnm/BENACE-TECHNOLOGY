'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
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
import { Loader2, X, Upload, Wand2, Eye, Save, Laptop, Sparkles, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LaptopCard } from '@/components/laptops/laptop-card';

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

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

export function ProductForm({ initialData, productId }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [processingIndex, setProcessingIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('editor');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const db = useFirestore();
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
      imageId: values.imageUrls[0] || '',
    });

    try {
      if (productId) {
        await setDoc(doc(db, 'products', productId), productData, { merge: true });
        toast({ title: 'Published!', description: 'Global storefront updated.' });
      } else {
        await addDoc(collection(db, 'products'), productData);
        toast({ title: 'Product Created!', description: 'Live in your shop now.' });
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
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    try {
      const base64Results = await Promise.all(files.map(fileToBase64));
      const currentImages = form.getValues('imageUrls');
      form.setValue('imageUrls', [...currentImages, ...base64Results], { shouldDirty: true });
      toast({ title: 'Media Added', description: `${files.length} photos ready for sync.` });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Upload Failed', description: 'Could not process images.' });
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const removeBackground = async (index: number) => {
    const imageUrl = form.getValues('imageUrls')[index];
    if (!imageUrl) return;

    setProcessingIndex(index);
    try {
      const { editedImageDataUri } = await editProductImage({
        imageDataUri: imageUrl,
        prompt: "Clean product photo, pure white background, high contrast, commercial quality.",
      });

      const current = [...form.getValues('imageUrls')];
      current[index] = editedImageDataUri;
      form.setValue('imageUrls', current, { shouldDirty: true });
      toast({ title: 'AI Enhanced', description: 'Background removed perfectly.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'AI Logic Error', description: 'Could not enhance image.' });
    } finally {
      setProcessingIndex(null);
    }
  };

  const previewData = form.watch();

  return (
    <div className="flex flex-col h-full bg-[#f3f6f9]">
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h2 className="text-xl font-black uppercase text-zinc-900 leading-none">{productId ? 'Edit Component' : 'Draft New Entry'}</h2>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mt-1">
            {productId ? `Model ID: ${productId}` : 'Creating temporary profile'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            className="rounded-lg h-9 px-4 text-[11px] font-bold uppercase text-zinc-400 hover:text-zinc-900"
            onClick={() => router.push('/admin/products')}
          >
            Discard
          </Button>
          <div className="h-4 w-px bg-zinc-100"></div>
          <Button 
            type="button" 
            variant="outline"
            onClick={() => setActiveTab(activeTab === 'editor' ? 'preview' : 'editor')}
            className="rounded-lg h-9 px-4 text-[11px] font-bold uppercase tracking-widest border-zinc-200"
          >
            {activeTab === 'editor' ? <><Eye className="mr-2 h-4 w-4" /> Live Preview</> : <><Laptop className="mr-2 h-4 w-4" /> Return to Editor</>}
          </Button>
          <Button 
            onClick={form.handleSubmit(onSubmit)} 
            disabled={loading}
            className="rounded-lg h-9 bg-indigo-500 hover:bg-indigo-600 text-white font-bold uppercase text-[10px] tracking-widest px-6 shadow-xl shadow-indigo-500/20"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {productId ? 'Update System' : 'Publish to Shop'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-[1200px] mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsContent value="editor" className="m-0 focus-visible:ring-0">
              <Form {...form}>
                <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column: Media & Specifications */}
                  <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-2xl border p-8 shadow-sm space-y-8">
                       <div className="flex items-center justify-between">
                         <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                           <Sparkles className="h-4 w-4 text-indigo-500" /> Media & Visualization
                         </h3>
                         <Button type="button" size="sm" onClick={() => fileInputRef.current?.click()} className="rounded-lg bg-zinc-900 text-white text-[9px] font-black uppercase px-4 h-8">
                           <Upload className="mr-2 h-3.5 w-3.5" /> Bulk Upload
                         </Button>
                         <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
                       </div>

                       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                         {form.watch('imageUrls').map((url, i) => (
                           <div key={i} className="group relative aspect-square rounded-xl bg-zinc-50 border p-2 overflow-hidden hover:ring-2 ring-indigo-500/20 transition-all">
                             <Image src={url} alt="Product" fill className="object-contain p-2" />
                             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                               <Button type="button" size="sm" variant="secondary" onClick={() => removeBackground(i)} disabled={processingIndex === i} className="h-7 w-[80%] text-[8px] font-black uppercase">
                                 {processingIndex === i ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="mr-1 h-3 w-3" />} AI Clean
                               </Button>
                               <Button type="button" size="sm" variant="destructive" onClick={() => {
                                 const current = [...form.getValues('imageUrls')];
                                 current.splice(i, 1);
                                 form.setValue('imageUrls', current);
                               }} className="h-7 w-[80%] text-[8px] font-black uppercase">Remove</Button>
                             </div>
                             {i === 0 && <span className="absolute top-2 left-2 bg-indigo-500 text-white text-[7px] font-black px-2 py-0.5 rounded-full uppercase">Master</span>}
                           </div>
                         ))}
                         <button 
                           type="button" 
                           onClick={() => fileInputRef.current?.click()}
                           className="aspect-square rounded-xl border-2 border-dashed border-zinc-100 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all flex flex-col items-center justify-center gap-2 group"
                         >
                           <div className="h-8 w-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-500 transition-colors">
                             <Plus className="h-4 w-4" />
                           </div>
                           <span className="text-[9px] font-black uppercase text-zinc-400">Add Image</span>
                         </button>
                       </div>
                    </div>

                    <div className="bg-white rounded-2xl border p-8 shadow-sm space-y-8">
                       <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900">Technical Matrix</h3>
                       <div className="grid gap-6 md:grid-cols-2">
                         <FormField control={form.control} name="specifications.processor" render={({ field }) => (
                           <FormItem><FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Processor</FormLabel><FormControl><Input placeholder="e.g. Core i7" {...field} className="h-10 bg-zinc-50 border-none rounded-lg text-[11px]" /></FormControl></FormItem>
                         )} />
                         <FormField control={form.control} name="specifications.ram" render={({ field }) => (
                           <FormItem><FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Memory</FormLabel><FormControl><Input placeholder="e.g. 16GB DDR5" {...field} className="h-10 bg-zinc-50 border-none rounded-lg text-[11px]" /></FormControl></FormItem>
                         )} />
                         <FormField control={form.control} name="specifications.storage" render={({ field }) => (
                           <FormItem><FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Storage</FormLabel><FormControl><Input placeholder="e.g. 512GB NVMe" {...field} className="h-10 bg-zinc-50 border-none rounded-lg text-[11px]" /></FormControl></FormItem>
                         )} />
                         <FormField control={form.control} name="specifications.display" render={({ field }) => (
                           <FormItem><FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Display</FormLabel><FormControl><Input placeholder="e.g. 14 inch UHD" {...field} className="h-10 bg-zinc-50 border-none rounded-lg text-[11px]" /></FormControl></FormItem>
                         )} />
                       </div>
                    </div>
                  </div>

                  {/* Right Column: Information Panel */}
                  <div className="space-y-8">
                     <div className="bg-white rounded-2xl border p-8 shadow-sm space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-900">Core Identity</h3>
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem><FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Model Name</FormLabel><FormControl><Input placeholder="Product name..." {...field} className="h-10 bg-zinc-50 border-none rounded-lg text-[11px] font-bold" /></FormControl><FormMessage /></FormItem>
                        )} />
                        <div className="grid grid-cols-2 gap-4">
                          <FormField control={form.control} name="brand" render={({ field }) => (
                            <FormItem><FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Brand</FormLabel><FormControl><Input placeholder="HP, Dell..." {...field} className="h-10 bg-zinc-50 border-none rounded-lg text-[11px]" /></FormControl><FormMessage /></FormItem>
                          )} />
                          <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Group</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="h-10 bg-zinc-50 border-none rounded-lg text-[11px]"><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent className="rounded-xl p-2 border-none shadow-xl"><SelectItem value="Laptops">Laptops</SelectItem><SelectItem value="Accessories">Accessories</SelectItem><SelectItem value="Monitors">Monitors</SelectItem><SelectItem value="Printers">Printers</SelectItem></SelectContent>
                              </Select>
                            </FormItem>
                          )} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem><FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Price (KSH)</FormLabel><FormControl><Input type="number" {...field} className="h-10 bg-zinc-50 border-none rounded-lg text-[11px]" /></FormControl></FormItem>
                          )} />
                          <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[10px] font-bold uppercase text-zinc-400">Condition</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger className="h-10 bg-zinc-50 border-none rounded-lg text-[11px]"><SelectValue /></SelectTrigger></FormControl>
                                <SelectContent className="rounded-xl p-2 border-none shadow-xl"><SelectItem value="New">New</SelectItem><SelectItem value="Boxed">Boxed</SelectItem><SelectItem value="Ex-UK">Ex-UK</SelectItem></SelectContent>
                              </Select>
                            </FormItem>
                          )} />
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl border p-8 shadow-sm space-y-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xs font-black uppercase text-zinc-900">Visibility Status</h3>
                          <FormField control={form.control} name="inStock" render={({ field }) => (
                            <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                          )} />
                        </div>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-relaxed">
                          {form.watch('inStock') ? 'Active: Item is visible on the global storefront and ready for purchase.' : 'Private: Item is saved as a draft and hidden from customers.'}
                        </p>
                     </div>

                     <div className="bg-zinc-900 rounded-2xl p-8 text-white space-y-4 shadow-xl">
                        <div className="flex items-center gap-2">
                           <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Cloud Sync Ready</span>
                        </div>
                        <p className="text-[11px] font-bold text-zinc-400 leading-relaxed uppercase tracking-wider">
                           All changes are instantly deployed to the Firebase core. Review your preview before finalizing.
                        </p>
                     </div>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="preview" className="m-0 focus-visible:ring-0">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-[1000px] mx-auto py-12">
                  <div className="space-y-6">
                     <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 border-b pb-4">Grid Representation</h3>
                     <div className="max-w-[200px] mx-auto">
                        <LaptopCard laptop={{...previewData, id: 'preview-id', specifications: previewData.specifications as any} as any} />
                     </div>
                  </div>
                  <div className="space-y-6">
                     <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 border-b pb-4">Status & Logic</h3>
                     <div className="bg-white rounded-2xl border p-8 space-y-4">
                        <div className="flex items-center gap-3">
                           <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                           <p className="text-sm font-black uppercase tracking-tighter">Validation Passed</p>
                        </div>
                        <div className="text-[10px] font-bold text-zinc-500 uppercase leading-relaxed tracking-widest space-y-2">
                           <p>• {previewData.imageUrls.length} Media parts attached</p>
                           <p>• Category: {previewData.category}</p>
                           <p>• Valuation: KSH {previewData.price.toLocaleString()}</p>
                           <p>• Condition: {previewData.status}</p>
                        </div>
                        <Button className="w-full h-11 bg-zinc-900 text-white font-black uppercase text-[10px] tracking-widest rounded-xl mt-4" onClick={form.handleSubmit(onSubmit)}>
                           Confirm & Publish
                        </Button>
                     </div>
                  </div>
               </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
