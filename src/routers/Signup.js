import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth"
import { useState } from "react";
import { Link } from "react-router-dom"
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Signup = () => {
    const auth = getAuth();
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const onChange = (event) => {

        const { target: { name, value } } = event;
        if (name === "email") {
            setEmail(value);
        }
        else if (name === "password") {
            setPassword(value);
        }
        else if (name === "password2") {
            setPassword2(value);
        }
        else if (name === "name") {
            setName(value);
        }

    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if(password!==password2){
            alert("Incorrect password confirmation")
            return
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            updateProfile(auth.currentUser, {
                displayName: name
            })
            alert('회원가입 성공')

        } catch (error) {
            alert(error)
        }
    }
    return (
        <div className="authContainer">
            <form onSubmit={onSubmit} className="container">
                <FontAwesomeIcon
                    icon={faTwitter}
                    color={"#04AAFF"}
                    size="3x"
                    style={{ marginBottom: 30 }}
                />
                <input
                    name="email"
                    type="text"
                    placeholder="example@gmail.com"
                    required
                    value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password (at least 6 characters)"
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="password2"
                    type="password"
                    placeholder="Password Again"
                    required
                    value={password2}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    required
                    value={name}
                    onChange={onChange}
                    className="authInput"
                />
                <input value="Sign Up" type="submit" className="authInput authSubmit" />
                <center>
                    <Link to="/" >Go Home</Link>
                </center>
            </form>

        </div>
    )
}

export default Signup