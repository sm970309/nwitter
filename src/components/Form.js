import React, { useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";
import { Link } from "react-router-dom";
const Form = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error,setError] = useState("");
    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        }
        else {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password)
            alert('로그인 성공')
        } catch (e) {
            setError(e.message)
        }
    }
    return (
        <form onSubmit={onSubmit} className="container" style={{marginBottom:"10px"}}>
            <input
                name="email"
                type="text"
                placeholder="Email"
                required
                value={email}
                onChange={onChange}
                className="authInput"
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={onChange}
                className="authInput"
            />
            <div>
                <input type="submit" value="Log In" 
                className="authInput authSubmit"
                />
                <center>
                {error && <div className="authError">{error}</div>}
                <Link to='/signup'>Create Account</Link>
                </center>
            </div>
        </form>
    )
}
export default Form;