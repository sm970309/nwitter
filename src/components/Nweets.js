import { deleteDoc, doc, getFirestore, updateDoc } from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import React, { useState } from "react";
import { fb } from "./App";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const db = getFirestore(fb)
    const storage = getStorage();
    // const desertRef = ref(storage,`${nweetObj.imgURL}`)
    const NweetTextRef = doc(db, 'nweet', `${nweetObj.id}`)
    const onDelete = async () => {
        const ok = window.confirm("Are you Sure?")
        if (ok) {
            await deleteDoc(NweetTextRef);
            if (nweetObj.imgURL) {
                const desertRef = ref(storage, `${nweetObj.imgURL}`)
                await deleteObject(desertRef);
            }

        }
    }
    const toggleEditing = () => {
        setEditing(prev => !prev)
        setNewNweet(nweetObj.text)
    }
    const onChange = (event) => {
        setNewNweet(event.target.value)
    }
    const onEdit = async (event) => {
        event.preventDefault();
        setEditing(prev => !prev)
        updateDoc(NweetTextRef, {
            text: newNweet
        })
    }

    return (
        <div className="nweet">
            {!editing ?
                <>
                    <h3>{nweetObj.text}</h3>
                    {nweetObj.imgURL && <img src={nweetObj.imgURL}/>}
                    <h5>{nweetObj.createName}</h5>

                    {isOwner &&
                        <div className="nweet__actions">

                            <span onClick={onDelete}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div >
                    }
                </> :
                <>
                    <form onSubmit={onEdit} className="container nweetEdit">
                        <input autoFocus value={newNweet} type="text" onChange={onChange} required />
                        <input value="Update" type="submit" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
            }


        </div>
    )
}

export default Nweet;