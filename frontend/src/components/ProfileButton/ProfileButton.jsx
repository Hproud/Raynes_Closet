
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import * as sessionActions from '../../store/session';
import { useEffect } from 'react';

export default function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
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
    {showMenu && (
    <ul>
      <li>{user.username}</li>
      <li>{user.firstName} {user.lastName}</li>
      <li>{user.email}</li>
      <li>
        <button onClick={logout}>Log Out</button>
      </li>
    </ul>
    )}
  </>
  )} //end of return
