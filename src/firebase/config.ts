import { initializeApp, getApps, getApp } from 'firebase/app';

/**
 * FIREBASE CONFIGURATION
 * 
 * Updated with production keys provided by the user.
 */
const firebaseConfig = {
  apiKey: "AIzaSyB31s6fzqKwj2g8O2w-9JWIWLOGUyLr8dM",
  authDomain: "studio-7563060614-14793.firebaseapp.com",
  projectId: "studio-7563060614-14793",
  storageBucket: "studio-7563060614-14793.firebasestorage.app",
  messagingSenderId: "102223625731",
  appId: "1:102223625731:web:2a217e30b4b14101bf5836"
};

export const getFirebaseConfig = () => firebaseConfig;

export function initializeFirebaseApp() {
  try {
    if (getApps().length > 0) {
      return getApp();
    }
    return initializeApp(firebaseConfig);
  } catch (error) {
    console.error("Firebase initialization failed:", error);
    return getApps().length > 0 ? getApp() : {} as any;
  }
}
