import {db, app} from '../../database/firebase'
import {collection, addDoc,doc,setDoc} from 'firebase/firestore';
import {sendPasswordResetEmail, getAuth} from 'firebase/auth';
const auth = getAuth(app);

const enviarCorreoRecuperacion= async(email) => {
    const result = {statusResponse:true, error:null}
    try {
        await sendPasswordResetEmail(auth, email)
        // await auth.sendPasswordResetEmail(email)
    } catch (error) {
        console.log("-----------------------------------------------")
        result.statusResponse = false;
        result.error = error;
    }
    return result
};

export {enviarCorreoRecuperacion}