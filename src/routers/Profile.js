import { getAuth, signOut, updateProfile } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { fb } from "components/App";
import { getFirestore, query, where, collection, onSnapshot, orderBy } from "firebase/firestore";
import Nweet from "components/Nweets";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";

const Profile = ({ userObj }) => {
    const auth = getAuth();
    const storage = getStorage();

    const db = getFirestore(fb)
    const [nweets, setNweets] = useState([])
    const [photo, setPhoto] = useState(userObj.photoURL)
    const oldPhoto = userObj.photoURL
    const [update, setUpdate] = useState(false)
    const getMyNweets = () => {
        const q = query(collection(db, "nweet"), where("createId", "==", userObj.uid), orderBy('createTime', "desc"))
        onSnapshot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray)
        })
    }
    const onFileChange = (event) => {
        const { target: { files } } = event
        const file = files[0]
        const reader = new FileReader();
        reader.onloadend = (finished) => {
            const { currentTarget: { result } } = finished
            setPhoto(result)
            setUpdate(true)
        }
        reader.readAsDataURL(file);


    }
    const updatePhoto = async() => {
        let url=null;
        if (photo !== null) {
            const FILE_NAME = uuidv4();
            const storageRef = ref(storage, `${userObj.uid}/${FILE_NAME}`)
            await uploadString(storageRef, photo, "data_url")
            url = await getDownloadURL(storageRef)       
        }
        try {
            updateProfile(auth.currentUser, {
                photoURL: url
            })
            window.alert("Update Complete")
        }catch(e){
            console.error(e)
        }
    }
    const canelChange = () => {
        setPhoto(oldPhoto)
        setUpdate(false)
    }
    useEffect(() => {
        getMyNweets();
    }, [])

    return (<>
        <h2>HI! {userObj.displayName}</h2>
        {photo ?
            <img width="100px" height="100px" src={photo} />
            : <img width="100px" height="100px" src="https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927" />}
        {update ?
            <div>
                <button onClick={updatePhoto}>Update Profile</button>
                <button onClick={canelChange}>Cancel</button>
            </div> :
            <div>
                <button>
                    <label htmlFor="upload">Choose File</label>
                </button>
                <input onChange={onFileChange} style={{ display: "none" }} id="upload" type="file" accept="image/*"/>

                <button onClick={() => signOut(auth)}>
                    Log Out
                </button>

            </div>}


        <div>
            {nweets.map((n) =>
                <Nweet key={n.id} nweetObj={n} isOwner={true} />
            )}
        </div>
    </>

    )
}

export default Profile;