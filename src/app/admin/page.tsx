
'use client';

import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Root admin page that redirects users based on their auth status.
 */
export default function AdminPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/admin/dashboard');
      } else {
        router.push('/admin/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-50">
      <div className="text-center font-black uppercase tracking-widest animate-pulse">
        Directing to Admin Portal...
      </div>
    </div>
  );
}
