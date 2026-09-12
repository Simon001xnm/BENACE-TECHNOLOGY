import { initializeFirebaseApp } from './config';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

/**
 * Initializes Firebase services for the application.
 * 
 * We use experimentalForceLongPolling to resolve persistent "unavailable" connection
 * errors that often occur in development environments where standard WebChannel
 * communication might be blocked.
 */
export function initializeFirebase() {
  const app = initializeFirebaseApp();
  
  const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
  });
  
  const auth = getAuth(app);
  const storage = getStorage(app);

  return { app, db, auth, storage };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
