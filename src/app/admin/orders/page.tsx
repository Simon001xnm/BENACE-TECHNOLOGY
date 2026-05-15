
'use client';

import { ShoppingBag, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function AdminOrdersPage() {
  return (
    <div className="space-y-8 p-6 md:p-10">
      <div>
        <h1 className="text-4xl font-black uppercase tracking-tighter text-black">Order Management</h1>
        <p className="font-bold text-muted-foreground uppercase tracking-widest text-xs mt-1">
          Tracking WhatsApp inquiries and fulfilled sales
        </p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <Input 
            placeholder="Search orders by customer or ID..." 
            className="pl-10 border-2 border-black font-bold h-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
        <Button variant="outline" className="border-2 border-black font-black uppercase h-12 px-6">
          <Filter className="mr-2 h-4 w-4" /> Filter
        </Button>
      </div>

      <div className="rounded-2xl border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-50 border-b-2 border-black">
            <TableRow>
              <TableHead className="font-black uppercase text-xs">Order ID</TableHead>
              <TableHead className="font-black uppercase text-xs">Customer</TableHead>
              <TableHead className="font-black uppercase text-xs">Status</TableHead>
              <TableHead className="font-black uppercase text-xs">Items</TableHead>
              <TableHead className="font-black uppercase text-xs">Total</TableHead>
              <TableHead className="text-right font-black uppercase text-xs">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={6} className="h-64 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="rounded-full bg-zinc-100 p-4">
                    <ShoppingBag className="h-8 w-8 text-zinc-300" />
                  </div>
                  <div>
                    <p className="font-black uppercase">No orders recorded yet</p>
                    <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-widest">
                      Live tracking will begin as orders are placed via WhatsApp
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
