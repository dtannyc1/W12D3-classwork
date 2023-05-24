import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/session";
import { Link } from "react-router-dom";
import "./Navigation.css"
import ProfileButton from "./ProfileButton";

const Navigation = props => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);

    return (
        <>
            <ul className="log-buttons">
                {(currentUser) ?
                    <>
                        <li>
                            <ProfileButton/>
                        </li>
                        <li>
                            <button onClick={ async e => {
                                e.preventDefault();
                                dispatch(logoutUser(currentUser.id))
                            }}>Log Out!</button>
                        </li>
                    </>:
                    <>
                        <li>
                            <Link to="/login">Login!</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign Up!</Link>
                        </li>
                    </>}
            </ul>
        </>
    )
}

export default Navigation;
