import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import React from "react";
import { fb } from "./App";

const Nweet = ({ nweetObj, isOwner }) => {
    const onDelete = async() =>{
        const db = getFirestore(fb)
        const NweetTextRef = doc(db,'nweet',`${nweetObj.id}`)
        const ok = window.confirm("Are you Sure?")
        if (ok){
            console.log(nweetObj.id)
            await deleteDoc(NweetTextRef);
        }
    }
    return (
        <div>
            <h3>{nweetObj.text}</h3>
            <h5>{nweetObj.createName}</h5>
            {isOwner && 
            <>
                <button onClick={onDelete}>Delete</button>
                <button>Edit</button>
            </>
            }
        </div>
    )
}

export default Nweet;