import React, { useState } from "react";
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    getAuth, 
    GoogleAuthProvider,
    GithubAuthProvider, 
    signInWithPopup} from "firebase/auth";
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(false)
    const onChange = (event) => {
        const { target: { name, value } } = event;
        console.log(name)
        if (name === "email") {
            setEmail(value);
        }
        else {
            setPassword(value);
        }

    }
    const onSubmit = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        try {
            if (user){
            await signInWithEmailAndPassword(auth, email, password)
            setUser(true)
            alert('로그인 성공')
            }      
            else{
                await createUserWithEmailAndPassword(auth,email,password)
                alert('회원가입 성공')
            }      
        }catch(error){
            alert(error)
        }
    }
    const onClick = () => {setUser(prev => !prev)}
    const onSocialClick= async (event) => {
        const name = event.target.name
        let provider;
        const auth = getAuth();
        if (name==='google'){
            provider = new GoogleAuthProvider();
        }
        else{
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(auth,provider)
        console.log(data)
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input
                    name="email"
                    type="text"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={onChange}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={onChange}
                />
                <input type="submit" value={user? "Log In":"Create Account"} />
            </form>
            <span onClick={onClick}>{user? "Sign Up":"Log In"}</span>
            <div>
                <button onClick={onSocialClick} name = "google">Continue with Google</button>
                <button onClick={onSocialClick} name = "github">Continue with Github</button>
            </div>

        </div>

    )
}

export default Auth;