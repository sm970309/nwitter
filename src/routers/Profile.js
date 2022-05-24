import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";

const Profile =({userObj}) =>{
    const auth = getAuth();
    return (<>
        <h2>HI!</h2>
        <h3>{userObj.email}</h3>
        <button onClick={() => signOut(auth)}>
            <Link to= "/">Log Out</Link>
        </button>
        </>

    )
}

export default Profile;