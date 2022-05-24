import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom"

const Signup = () => {
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
            await createUserWithEmailAndPassword(auth, email, password)
            alert('회원가입 성공')
            
        } catch (error) {
            alert(error)
        }
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Email: </label>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <input value="Sign Up" type="submit" />
                <button>
                    <Link to="/">Go Home</Link>
                </button>
            </form>

        </div>
    )
}

export default Signup