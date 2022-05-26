import React, { useEffect, useState } from "react";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import { fb } from "components/App";
import Nweet from "components/Nweets";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Home = ({ userObj }) => {
    const db = getFirestore(fb)
    const storage = getStorage()
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attach, setAttach] = useState(null);
    const [pb,setPb] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "nweet"), orderBy('createTime', "desc"))
        onSnapshot(q, (snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            setNweets(nweetArray)
        })
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        let url = null;
        if (nweet === "") {
            alert("내용을 입력하세요")
            return
        }
        if (attach !== null) {
            const FILE_NAME = uuidv4();
            const storageRef = ref(storage, `${userObj.uid}/${FILE_NAME}`)
            await uploadString(storageRef, attach, "data_url")
            url = await getDownloadURL(storageRef)
        }

        try {
            await addDoc(collection(db, 'nweet'), {
                text: nweet,
                createId: userObj.uid,
                createName: userObj.email,
                createTime: Date.now(),
                imgURL: url,
                photoURL: (userObj.photoURL? userObj.photoURL:"https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927"),
                scope:pb,
                userName: userObj.displayName
                
            })
        }
        catch (e) {
            console.error("Error: ", e)
        }
        setNweet('')
        setAttach(null)

    }
    const onChange = (event) => {
        setNweet(event.target.value)
    }
    const onFileChange = (event) => {
        const { target: { files } } = event
        const file = files[0]
        const reader = new FileReader();
        reader.onloadend = (finished) => {
            const { currentTarget: { result } } = finished
            setAttach(result)
        }
        reader.readAsDataURL(file);

    }
    const clearImg = () => {
        setAttach(null)
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="factoryForm">
                <div className="factoryInput__container">
                    <input
                        className="factoryInput__input"
                        onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} />
                    <input className="factoryInput__arrow" type="submit" value="Nweet" />
                </div>
                <div className="factoryCheck__label" onClick={()=>setPb((prev)=>!prev)}>
                    공개범위:
                {pb? 
                <span > Public</span>:
                <>
                <span > Private</span>
                </>}
                </div>
                <label for="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input id="attach-file" type="file" accept="image/*" onChange={onFileChange}
                    style={{ display: "none" }} />
                <div>
                    {attach &&
                        <div className="factoryForm__attachment">
                            <img src={attach}
                                style={{
                                    backgroundImage: attach,
                                }} />
                            <div className="factoryForm__clear" onClick={clearImg}>
                                <span>Remove</span>
                                <FontAwesomeIcon icon={faTimes} />
                            </div>
                        </div>}
                </div>
            </form>
            <div style={{ marginTop: 30 }}>
                {nweets.map((n) =>
                    <Nweet key={n.id} nweetObj={n} isOwner={n.createId === userObj.uid}/>
                )}
            </div>
        </div>
    )
}

export default Home;