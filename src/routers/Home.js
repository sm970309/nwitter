import React, { useEffect, useState } from "react";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadString } from 'firebase/storage'
import { fb } from "components/App";
import Nweet from "components/Nweets";
import { v4 as uuidv4 } from "uuid";

const Home = ({ userObj }) => {
    const db = getFirestore(fb)
    const storage = getStorage()
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);
    const [attach, setAttach] = useState(null);
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
        let url=null;
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
                imgURL: url
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
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} />
                    <input type="submit" value="Nweet" />
                </div>
                <input type="file" accept="image/*" onChange={onFileChange} />
                <div>
                    {Boolean(attach) ? <>
                        <img src={attach} width="200px" height="150px" />
                        <button onClick={clearImg}>Clear</button>
                    </> : null}
                </div>
            </form>
            <div>
                {nweets.map((n) =>
                    <Nweet key={n.id} nweetObj={n} isOwner={n.createId === userObj.uid} />
                )}
            </div>
        </div>
    )
}

export default Home;