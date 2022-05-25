import { getAuth, signOut } from "firebase/auth";
import React from "react";

const Profile =({userObj}) =>{
    const auth = getAuth();
    return (<>
        <h2>HI!</h2>
        <h3>{userObj.email}</h3>
        <button onClick={() => signOut(auth)}>
            Log Out
        </button>
        </>

    )
}

export default Profile;