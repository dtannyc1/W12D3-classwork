import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Navigation.css"
import ProfileButton from "./ProfileButton";

const Navigation = props => {
    const currentUser = useSelector(state => state.session.user);

    return (
        <>
            <ul className="log-buttons">
                {(currentUser) ?
                    <>
                        <ProfileButton/>
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
