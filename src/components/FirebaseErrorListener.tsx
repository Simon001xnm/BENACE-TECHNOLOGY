'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

/**
 * Listens for Firebase errors globally.
 * The pop-up notification has been removed as per user request to provide a cleaner experience.
 */
export function FirebaseErrorListener() {
  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      // Log to console for developer debugging without showing a UI pop-up to the admin
      console.error(`Permission Denied: ${error.context.operation} at ${error.context.path}`, error.context.requestResourceData);
    };

    errorEmitter.on('permission-error', handlePermissionError);
    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, []);

  return null;
}
