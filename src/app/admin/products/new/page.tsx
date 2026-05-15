
'use client';

import { ProductForm } from '@/components/admin/product-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="container max-w-4xl py-12 px-4">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-4 pl-0 text-muted-foreground hover:text-black font-bold">
          <Link href="/admin/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Inventory
          </Link>
        </Button>
        <h1 className="text-4xl font-black uppercase tracking-tight text-black">Add New Product</h1>
        <p className="text-muted-foreground font-medium">List a new laptop or accessory in your store</p>
      </div>

      <div className="rounded-2xl border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,186,242,1)]">
        <ProductForm />
      </div>
    </div>
  );
}
