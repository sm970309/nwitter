import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth } from "firebase/auth";
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
        let data;
        try {
            if (user) {
                data = await signInWithEmailAndPassword(auth, email, password)
                alert('로그인 성공')
            }
            else {
                data = await createUserWithEmailAndPassword(auth, email, password)
                alert("가입성공")
                setUser(true);
            }
        }catch(error){
            alert(error)
        }

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
                <input type="submit" value="Log In" />
            </form>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>

        </div>

    )
}

export default Auth;