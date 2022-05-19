import {initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAmjl19GYUg0emRh0JH6KRfnbb8HIxiyDU",
    authDomain: "nwitter-ff1a0.firebaseapp.com",
    projectId: "nwitter-ff1a0",
    storageBucket: "nwitter-ff1a0.appspot.com",
    messagingSenderId: "964762026269",
    appId: "1:964762026269:web:810ae211ef69d22e9421f4"    
};
initializeApp(firebaseConfig);

export const auth = getAuth();