import { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../store/session";
import './SignupForm.css';

const SignupFormPage = props => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (password !== password2) {
            setErrors(['Passwords must match'])
        } else {
            let user = {username, password, email};
            try {
                await dispatch(signup(user));
            } catch (errs) {
                setErrors(errs.errors)
            }
        }
    }

    return (
        <div className="signup-form">
            <h2>Sign Up Form:</h2>
            <form onSubmit={handleSubmit}>
                {errors.map(err => {
                    return <div className="error" key={err}>{err}</div>
                })}
                <label>Username: <br/>
                    <input type="input" value={username} onChange={e => setUsername(e.target.value)}/>
                </label>
                <br/>

                <label>Email: <br/>
                    <input type="input" value={email} onChange={e => setEmail(e.target.value)}/>
                </label>
                <br/>

                <label>Password: <br/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <br/>

                <label>Confirm Password: <br/>
                    <input type="password" value={password2} onChange={e => setPassword2(e.target.value)}/>
                </label>
                <br/>

                <button>Sign Up!</button>
            </form>
        </div>
    )
}

export default SignupFormPage;
