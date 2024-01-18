import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//     authDomain:  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORE_BUCKET,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
//   };

const firebaseConfig =  {
  apiKey: "AIzaSyAI1TnSHOqXfhOSjvv_XXLxGbBMba2yi6A",
  authDomain: "thena-hackfest.firebaseapp.com",
  projectId: "thena-hackfest",
  storageBucket: "thena-hackfest.appspot.com",
  messagingSenderId: "450204803958",
  appId: "1:450204803958:web:b0257d22d2a1d59c351057",
  measurementId: "G-W0EZSG4ZTF"
};

export const firebase = initializeApp(firebaseConfig);
export const app = getApps().length ? getApp() : firebase;
export const auth = getAuth(app);

