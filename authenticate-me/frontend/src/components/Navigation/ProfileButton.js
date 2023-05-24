import { useState } from "react";
import { logoutUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";


const ProfileButton = props => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="profile-button">
            <i class="fa-solid fa-user"></i>

            <p>{currentUser.username}</p>
            <button onClick={ async e => {
                e.preventDefault();
                dispatch(logoutUser(currentUser.id))
            }}>Log Out!</button>
        </div>
    )
}

export default ProfileButton;
