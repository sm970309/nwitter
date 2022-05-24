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
        } catch (error) {
            alert(error)
        }
    }
    return (
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
            <div>
                <input type="submit" value="Log In" />
                <Link to='/signup'>Create Account</Link>
            </div>
        </form>
    )
}
export default Form;