import { initializeApp, getApps, getApp } from 'firebase/app';

/**
 * Firebase configuration for Benace Tech Hub.
 * 
 * IMPORTANT: Replace these placeholders with your actual project credentials 
 * from the Firebase Console (Project Settings > Your Apps > Web App).
 */
const firebaseConfig = {
  apiKey: "AIzaSyAs-placeholder-api-key",
  authDomain: "placeholder-project-id.firebaseapp.com",
  projectId: "placeholder-project-id",
  storageBucket: "placeholder-project-id.firebasestorage.app",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef1234567890"
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
    // Return a dummy app object if initialization fails to prevent total crash
    return getApps().length > 0 ? getApp() : {} as any;
  }
}
