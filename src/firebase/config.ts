import { initializeApp, getApps, getApp } from 'firebase/app';

// This configuration is a placeholder and should be updated in the Firebase console
// for your specific project.
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
  if (getApps().length > 0) {
    return getApp();
  }
  return initializeApp(firebaseConfig);
}
