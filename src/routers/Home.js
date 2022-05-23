import React, { useState } from "react";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { fb } from "components/App";

const Home = () => {
    const [nweet,setNweet] = useState('');
    const onSubmit = async (event) =>{
        event.preventDefault();
        const db = getFirestore(fb)
        try{
            const docRef = await addDoc(collection(db,'nweet'),{
                nweet,
                createdAt:Date.now(),
            })
            console.log(docRef)
        }
        catch(e){
            console.error("Error: ",e)
        }
        setNweet('')
    }
    const onChange =(event) =>{
        setNweet(event.target.value)
        
    }
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input onChange={onChange} value={nweet} type="text" placeholder="What's on your mind?" maxLength={120}/>
            <input type="submit" value="Nweet"/>
        </form>
    </div>
)}

export default Home;