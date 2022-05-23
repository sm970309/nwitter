import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";

const Profile =() =>{
    const auth = getAuth();
    return (
        <button onClick={() => signOut(auth)}>
            <Link to= "/">Log Out</Link>
        </button>
    )
}

export default Profile;