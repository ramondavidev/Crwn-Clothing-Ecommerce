import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
} from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBhT6o7xpOBSV78vMgwSKMkz6-QAlMT7FA",
    authDomain: "crwn-clothing-db-dd812.firebaseapp.com",
    projectId: "crwn-clothing-db-dd812",
    storageBucket: "crwn-clothing-db-dd812.appspot.com",
    messagingSenderId: "884359652694",
    appId: "1:884359652694:web:bdb8da264f6f6c769c22f7"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = await doc(db, 'users', userAuth.uid);
    const userSnapShot = await getDoc(userDocRef);

    //create a new user in database
    if(!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            })
        } catch (error) {
            console.log('error creating the user!', error.message);
        }

        return userDocRef;

    }

}