import AppRouter from "components/Router";
import React, { useEffect, useState } from "react";
import {initializeApp} from "firebase/app";
import { getAuth, onAuthStateChanged} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAmjl19GYUg0emRh0JH6KRfnbb8HIxiyDU",
    authDomain: "nwitter-ff1a0.firebaseapp.com",
    projectId: "nwitter-ff1a0",
    storageBucket: "nwitter-ff1a0.appspot.com",
    messagingSenderId: "964762026269",
    appId: "1:964762026269:web:810ae211ef69d22e9421f4"    
};
export const fb = initializeApp(firebaseConfig);
export const auth = getAuth();


function App() {
  const [userObj,setUserObj] = useState(null);
  const [init,setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user)
      }
      else setIsLoggedIn(false);
      setInit(true);
    })
  },[])
  return (
    <div>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>:"Initializing"}
    </div>
  );
}

export default App;
