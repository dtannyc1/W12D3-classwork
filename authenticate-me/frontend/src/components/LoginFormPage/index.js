import { useState } from "react";
import { loginUser } from "../../store/session";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./LoginForm.css"

const LoginFormPage = props => {
    const dispatch = useDispatch();
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])
    const currentUser = useSelector(state => state.session.user)

    if (currentUser) {
        return <Redirect to="/"/>
    }

    const handleSubmit = async e => {
        e.preventDefault();
        let user = {credential: credential, password: password}
        try {
            let res = await dispatch(loginUser(user))

        } catch (error) {
            setErrors(error.errors)
        }
    }

    return (
        <div className="login-form">
            <h2>Login Form Page:</h2>
            <form onSubmit={handleSubmit}>
                {errors.map(err => {
                    return <div className="error" key={err}>{err}</div>
                })}
                <br/>
                <label>Username or Email: <br/>
                    <input type="text" value={credential} onChange={e => setCredential(e.target.value)}/>
                    <br/>
                </label>
                <br/>
                <label>Password: <br/>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <br/>
                </label>
                <br/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginFormPage;
