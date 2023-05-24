import { useEffect, useState } from "react";
import { logoutUser } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";


const ProfileButton = props => {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true)
    }

    useEffect(() => {
        const closeMenu = () => {
            console.log("closed")
            setShowMenu(false)
        }

        if (showMenu){
            window.addEventListener("click", closeMenu);

            return function cleanup() {
                window.removeEventListener("click", closeMenu);
            }
        }
    }, [showMenu])

    return (
        <div className="profile-button">
            <i class="fa-solid fa-user" onClick={e => openMenu()}></i>

            {(showMenu) ? <div className="profile-dropdown">
                <p>{currentUser.username}</p>
                <p>{currentUser.email}</p>
                <button onClick={ async e => {
                    e.preventDefault();
                    dispatch(logoutUser(currentUser.id))
                }}>Log Out!</button>
                </div> : <></>
            }
        </div>
    )
}

export default ProfileButton;
