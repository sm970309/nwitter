
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup
} from "firebase/auth";
import Form from "components/Form";
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
        <div>
            <Form />
            <div>
                <button onClick={onSocialClick} name="google">Continue with Google</button>
                <button onClick={onSocialClick} name="github">Continue with Github</button>
            </div>

        </div>

    )
}

export default Auth;