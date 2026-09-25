'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { laptops, accessories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { DatabaseBackup, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function sanitizeFirestoreData(data: any): any {
  if (Array.isArray(data)) {
    return data.map(sanitizeFirestoreData);
  }
  if (data !== null && typeof data === 'object' && !(data instanceof Date)) {
    if (data._methodName === 'serverTimestamp' || data.constructor?.name === 'FieldValueImpl') {
      return data;
    }
    
    return Object.fromEntries(
      Object.entries(data)
        .filter(([_, v]) => v !== undefined)
        .map(([k, v]) => [k, sanitizeFirestoreData(v)])
    );
  }
  return data;
}

export function ImportDataButton() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();

  const handleImport = async () => {
    if (!db) return;
    
    if (laptops.length === 0 && accessories.length === 0) {
        toast({
            variant: "destructive",
            title: "Source Catalog Empty",
            description: "The static source file is currently empty. Please add products manually.",
        });
        return;
    }

    setLoading(true);

    try {
      const allItems = [
        ...laptops.map(l => ({ ...l, category: 'Laptops', type: 'laptop' })),
        ...accessories.map(a => ({ ...a, type: 'accessory' }))
      ];

      for (const item of allItems) {
        const productRef = doc(db, 'products', item.id);
        
        const productData = sanitizeFirestoreData({
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          inStock: true
        });

        await setDoc(productRef, productData, { merge: true });
      }

      toast({
        title: "Inventory Migrated",
        description: `Successfully imported ${allItems.length} products to Firestore.`,
      });
      setDone(true);
    } catch (error) {
      console.error("Import Data Error:", error);
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: "There was an error moving data to the database.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (laptops.length === 0 && accessories.length === 0) {
      return (
        <Button 
            disabled 
            className="bg-zinc-100 text-zinc-400 font-black uppercase tracking-widest border-2 border-zinc-200 shadow-none cursor-not-allowed"
        >
            <AlertCircle className="mr-2 h-4 w-4" /> Manual Setup Mode
        </Button>
      );
  }

  if (done) {
    return (
      <Button disabled className="bg-emerald-500 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase tracking-widest">
        <CheckCircle2 className="mr-2 h-4 w-4" /> Sync Complete
      </Button>
    );
  }

  return (
    <Button 
      onClick={handleImport} 
      disabled={loading}
      className="bg-primary text-black font-black uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
    >
      {loading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <DatabaseBackup className="mr-2 h-4 w-4" />
      )}
      {loading ? 'Migrating...' : 'Import Catalog'}
    </Button>
  );
}
