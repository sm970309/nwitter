import React, { useEffect, useState } from "react";
import { addDoc, collection, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore";
import { fb } from "components/App";
import Nweet from "components/Nweets";


const Home = ({ userObj }) => {
    const db = getFirestore(fb)
    const [nweet, setNweet] = useState('');
    const [nweets, setNweets] = useState([]);

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
        if (nweet === "") {
            alert("내용을 입력하세요")
        }
        else {
            try {
                await addDoc(collection(db, 'nweet'), {
                    text: nweet,
                    createId: userObj.uid,
                    createName: userObj.email,
                    createTime: Date.now()
                })
            }
            catch (e) {
                console.error("Error: ", e)
            }
            setNweet('')
        }
    }
    const onChange = (event) => {
        setNweet(event.target.value)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((n) =>
                    <Nweet key = {n.id} nweetObj={n} isOwner={n.createId===userObj.uid} />
                )}
            </div>
        </div>
    )
}

export default Home;