import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDECpAeiikIk3id5UVyFXZRSBftPNBAneA",
    authDomain: "appis-2022.firebaseapp.com",
    projectId: "appis-2022",
    storageBucket: "appis-2022.appspot.com",
    messagingSenderId: "447817509959",
    appId: "1:447817509959:web:29fdec7565ecb5bb629562"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);