
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import { useEffect } from 'react';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';

export default function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(state => state.session.user)

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
   navigate("/", { replace: true });

  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };


  return (
    <>
    <button>
            <FaUserCircle onClick={toggleMenu} />
    </button>
    {showMenu && user && (
    <ul>
      <li>Hello, {user.username}</li>
      <li>{user.firstName} {user.lastName}</li>
      <li>{user.email}</li>
      <li>
        <button onClick={logout}>Log Out</button>
      </li>
    </ul>
    )}
    {showMenu && !user && (
        <ul>
           <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
      <li>
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
        </ul>
      )}
  </>
  )} //end of return
