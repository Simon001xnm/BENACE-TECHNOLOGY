import { initializeApp, getApps, getApp } from 'firebase/app';

/**
 * FIREBASE CONFIGURATION GUIDE
 * 
 * To get your production keys:
 * 1. Go to https://console.firebase.google.com
 * 2. Select your project.
 * 3. Click the Gear Icon (⚙️) > Project Settings.
 * 4. Scroll down to "Your apps" -> select your Web App (</>).
 * 5. Choose "Config" and copy the values below.
 */
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "REPLACE_WITH_YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "REPLACE_WITH_YOUR_PROJECT_ID",
  storageBucket: "REPLACE_WITH_YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "REPLACE_WITH_YOUR_SENDER_ID",
  appId: "REPLACE_WITH_YOUR_APP_ID"
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
