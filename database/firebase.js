import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore'
// TODO: Replace the following with your app's Firebase project configuration


const firebaseConfig = {
  apiKey: "AIzaSyC56D_WnqgsPXo_CGPxsKIJ0lk5HfK2XZU",
  authDomain: "bd-rodo.firebaseapp.com",
  projectId: "bd-rodo",
  storageBucket: "bd-rodo.appspot.com",
  messagingSenderId: "421003672160",
  appId: "1:421003672160:web:2947ec6a8c16f352a02105"
};
// const firebaseConfig = {
//     apiKey: "AIzaSyDECpAeiikIk3id5UVyFXZRSBftPNBAneA",
//     authDomain: "appis-2022.firebaseapp.com",
//     projectId: "appis-2022",
//     storageBucket: "appis-2022.appspot.com",
//     messagingSenderId: "447817509959",
//     appId: "1:447817509959:web:29fdec7565ecb5bb629562"
//   };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
