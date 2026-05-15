
'use client';

import { useState } from 'react';
import { useFirestore } from '@/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { laptops, accessories } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { DatabaseBackup, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function ImportDataButton() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const db = useFirestore();
  const { toast } = useToast();

  const handleImport = async () => {
    if (!db) return;
    setLoading(true);

    try {
      const allItems = [
        ...laptops.map(l => ({ ...l, category: 'Laptops', type: 'laptop' })),
        ...accessories.map(a => ({ ...a, type: 'accessory' }))
      ];

      for (const item of allItems) {
        const productRef = doc(db, 'products', item.id);
        await setDoc(productRef, {
          ...item,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          inStock: true
        }, { merge: true });
      }

      toast({
        title: "Inventory Migrated",
        description: `Successfully imported ${allItems.length} products to Firestore.`,
      });
      setDone(true);
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Import Failed",
        description: "There was an error moving data to the database.",
      });
    } finally {
      setLoading(false);
    }
  };

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
