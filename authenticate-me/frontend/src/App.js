import LoginFormPage from "./components/LoginFormPage";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./store/session";

function App() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    return (
        <>
            <h1>Hello from App</h1>
            <Route exact path="/">
                {(currentUser) ?
                    <>
                        <button onClick={ async e => {
                            e.preventDefault();
                            dispatch(logoutUser(currentUser.id))
                        }}>Log Out!</button>
                    </> :
                    <>
                        <Link to="/login">Login!</Link>
                    </>}

            </Route>
            <Route path="/login">
                <LoginFormPage/>
            </Route>
        </>
    );
}

export default App;
