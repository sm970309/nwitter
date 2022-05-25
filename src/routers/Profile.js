import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { fb } from "components/App";
import { getFirestore, query, where,collection,onSnapshot, orderBy } from "firebase/firestore";
import Nweet from "components/Nweets";
const Profile =({userObj}) =>{
    const auth = getAuth();
    const db = getFirestore(fb)
    const [nweets,setNweets] = useState([])
    const getMyNweets = () =>{
        const q = query(collection(db, "nweet"),where("createId","==",userObj.uid),orderBy('createTime', "desc"))
        onSnapshot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray)
        })
    }
    useEffect(()=>{
        getMyNweets();
    },[])

    return (<>
        <h2>HI!</h2>
        <h3>{userObj.email}</h3>
        <button onClick={() => signOut(auth)}>
            Log Out
        </button>
        <div>
        {nweets.map((n) =>
                    <Nweet key={n.id} nweetObj={n} isOwner={true} />
                )}
        </div>
        </>

    )
}

export default Profile;