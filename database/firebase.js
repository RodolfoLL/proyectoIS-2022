import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore'
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv8raHgifmDBthYQhs_b4FAODMgnc5HwU",
  authDomain: "medicate-app-recordatorio.firebaseapp.com",
  projectId: "medicate-app-recordatorio",
  storageBucket: "medicate-app-recordatorio.appspot.com",
  messagingSenderId: "60092998935",
  appId: "1:60092998935:web:3835710a93de5d308a0352",
  measurementId: "G-DB8N5HNMHE"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
