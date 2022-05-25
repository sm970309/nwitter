
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import Form from "components/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faGoogle,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";


const Auth = () => {
    const auth = getAuth();

    const onSocialClick = async (event) => {
        const name = event.target.name
        let provider;
        if (name === 'google') {
            provider = new GoogleAuthProvider();
        }
        else {
            provider = new GithubAuthProvider();
        }
        await signInWithPopup(auth, provider)
    }
    return (

        <div className="authContainer">
            <FontAwesomeIcon
                icon={faTwitter}
                color={"#04AAFF"}
                size="3x"
                style={{ marginBottom: 30 }}
            />
            <Form />
            <div className="authBtns">
                <button onClick={onSocialClick} name="google" className="authBtn">Continue with Google
                    <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button onClick={onSocialClick} name="github" className="authBtn">Continue with Github
                    <FontAwesomeIcon icon={faGithub} /></button>
            </div>

        </div>

    )
}

export default Auth;