import { initializeFirebaseApp } from './config';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export function initializeFirebase() {
  const app = initializeFirebaseApp();
  const db = getFirestore(app);
  const auth = getAuth(app);

  return { app, db, auth };
}

export * from './provider';
export * from './auth/use-user';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
