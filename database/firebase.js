import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore'
// TODO: Replace the following with your app's Firebase project configuration
/*const firebaseConfig = {
    apiKey: "AIzaSyDECpAeiikIk3id5UVyFXZRSBftPNBAneA",
    authDomain: "appis-2022.firebaseapp.com",
    projectId: "appis-2022",
    storageBucket: "appis-2022.appspot.com",
    messagingSenderId: "447817509959",
    appId: "1:447817509959:web:29fdec7565ecb5bb629562"
  };*/
  const firebaseConfig = {
    apiKey: "AIzaSyCQvqh5cT-RXLXIPCHja4-WOKPl4XSZ3nQ",
    authDomain: "bd-pruebas-is-2022.firebaseapp.com",
    projectId: "bd-pruebas-is-2022",
    storageBucket: "bd-pruebas-is-2022.appspot.com",
    messagingSenderId: "268388133881",
    appId: "1:268388133881:web:2b679954a2de9f72e6ab28"
  };

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
