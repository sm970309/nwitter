import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, SignInMethod } from "firebase/auth";
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
    const LogIn = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            setUser(true)
            alert('로그인 성공')            
        }catch(error){
            alert(error)
        }
    }
    const CreateAccount = async (event) => {
        event.preventDefault();
        const auth = getAuth();
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            setUser(false)
            alert('가입 성공')            
        }catch(error){
            alert(error)
        }
    }
    return (
        <div>
            <form onSubmit={!user? LogIn:CreateAccount}>
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
                <input type="submit" value="Log In" />
                <input type="submit" value="Create Account" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>

        </div>

    )
}

export default Auth;