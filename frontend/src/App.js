import LoginFormPage from "./components/LoginFormPage";
import { Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./store/session";
import SignupFormPage from "./components/SignupFormPage";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import Navigation from "./components/Navigation";

function App() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user)

    return (
        <>
            <h1>Authenticate Me App</h1>
            {/* <Route exact path="/"> */}
                <Navigation/>
            {/* </Route> */}
            <Route path="/login">
                <LoginFormPage/>
            </Route>
            <Route path="/signup">
                {(currentUser) ? <Redirect to="/"/> : <SignupFormPage/>}
            </Route>
        </>
    );
}

export default App;
