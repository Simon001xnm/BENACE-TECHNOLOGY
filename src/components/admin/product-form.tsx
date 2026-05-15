
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirestore } from '@/firebase';
import { doc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
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
import { ImageIcon, Loader2, X } from 'lucide-react';
import Image from 'next/image';

const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  brand: z.string().min(2, 'Brand is required'),
  price: z.coerce.number().min(0),
  oldPrice: z.coerce.number().optional(),
  category: z.string().min(1, 'Category is required'),
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
  const db = useFirestore();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: '',
      brand: '',
      price: 0,
      category: 'Laptops',
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

    try {
      const productData = {
        ...values,
        updatedAt: serverTimestamp(),
        createdAt: initialData?.createdAt || serverTimestamp(),
      };

      if (productId) {
        await setDoc(doc(db, 'products', productId), productData);
        toast({ title: 'Product Updated', description: 'Changes have been saved successfully.' });
      } else {
        await addDoc(collection(db, 'products'), productData);
        toast({ title: 'Product Created', description: 'New product added to inventory.' });
      }

      router.push('/admin/products');
      router.refresh();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Something went wrong.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddImageUrl = () => {
    const url = prompt('Enter Image URL:');
    if (url) {
      const current = form.getValues('imageUrls') || [];
      form.setValue('imageUrls', [...current, url]);
    }
  };

  const removeImage = (index: number) => {
    const current = form.getValues('imageUrls');
    form.setValue('imageUrls', current.filter((_, i) => i !== index));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black uppercase text-xs">Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. MacBook Pro 14" {...field} className="border-2 border-black font-bold" />
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
                <FormLabel className="font-black uppercase text-xs">Brand</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. Apple" {...field} className="border-2 border-black font-bold" />
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
                <FormLabel className="font-black uppercase text-xs">Price (KES)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} className="border-2 border-black font-bold" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-black uppercase text-xs">Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="border-2 border-black font-bold">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="font-bold">
                    <SelectItem value="Laptops">Laptops</SelectItem>
                    <SelectItem value="Desktops">Desktops</SelectItem>
                    <SelectItem value="Accessories">Accessories</SelectItem>
                    <SelectItem value="Printers">Printers</SelectItem>
                    <SelectItem value="Networking">Networking</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-black uppercase tracking-tight">Product Status & Stock</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black uppercase text-xs">Condition</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-2 border-black font-bold">
                        <SelectValue placeholder="Select Condition" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="font-bold">
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="Boxed">Boxed</SelectItem>
                      <SelectItem value="Ex-UK">Ex-UK</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="inStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border-2 border-black p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="font-black uppercase text-xs">Availability</FormLabel>
                    <FormDescription className="text-[10px] font-bold">Is this product currently in stock?</FormDescription>
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

        <div className="space-y-4">
          <h3 className="text-lg font-black uppercase tracking-tight">Specifications</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="specifications.processor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black uppercase text-xs">Processor</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-2 border-black font-bold" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specifications.ram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black uppercase text-xs">RAM</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-2 border-black font-bold" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specifications.storage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black uppercase text-xs">Storage</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-2 border-black font-bold" />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="specifications.display"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-black uppercase text-xs">Display</FormLabel>
                  <FormControl>
                    <Input {...field} className="border-2 border-black font-bold" />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-black uppercase text-xs">Description</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[120px] border-2 border-black font-bold" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black uppercase tracking-tight">Product Images</h3>
            <Button type="button" variant="outline" size="sm" onClick={handleAddImageUrl} className="border-2 border-black font-bold uppercase text-[10px]">
              <ImageIcon className="mr-2 h-3 w-3" /> Add Image URL
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {form.watch('imageUrls').map((url, i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-lg border-2 border-black bg-zinc-50">
                <Image src={url} alt={`Preview ${i}`} fill className="object-contain p-2" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute right-1 top-1 rounded-full bg-red-600 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
          {form.watch('imageUrls').length === 0 && (
            <div className="flex h-32 flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50">
              <ImageIcon className="mb-2 h-8 w-8 text-zinc-300" />
              <p className="text-xs font-bold text-zinc-400">No images added yet</p>
            </div>
          )}
        </div>

        <Button 
          type="submit" 
          disabled={loading}
          className="h-14 w-full bg-black font-black uppercase tracking-widest text-white border-2 border-black hover:bg-primary hover:text-black shadow-[8px_8px_0px_0px_rgba(0,186,242,1)] hover:shadow-none transition-all"
        >
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {productId ? 'Update Product' : 'Publish Product'}
        </Button>
      </form>
    </Form>
  );
}
