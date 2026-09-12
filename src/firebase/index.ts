import { initializeFirebaseApp } from './config';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

export function initializeFirebase() {
  const app = initializeFirebaseApp();
  
  /**
   * We use initializeFirestore with experimentalAutoDetectLongPolling enabled.
   * This helps resolve "unavailable" errors in environments where the default 
   * WebChannel connection might be blocked by proxies or firewalls.
   */
  const db = initializeFirestore(app, {
    experimentalAutoDetectLongPolling: true,
  });
  
  const auth = getAuth(app);
  const storage = getStorage(app);

  return { app, db, auth, storage };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
