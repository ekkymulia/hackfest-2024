import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAI1TnSHOqXfhOSjvv_XXLxGbBMba2yi6A",
    authDomain: "thena-hackfest.firebaseapp.com",
    projectId: "thena-hackfest",
    storageBucket: "thena-hackfest.appspot.com",
    messagingSenderId: "450204803958",
    appId: "1:450204803958:web:b0257d22d2a1d59c351057",
    measurementId: "G-W0EZSG4ZTF"
  };

const firebase = initializeApp(firebaseConfig);
const app = getApps().length ? getApp() : firebase;
const auth = getAuth(app);


export { auth, app, firebase };