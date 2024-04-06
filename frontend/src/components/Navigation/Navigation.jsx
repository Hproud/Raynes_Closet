
import { useDispatch, useSelector } from 'react-redux'
import ProfileButton from "../ProfileButton/ProfileButton"
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';

export default function Navigation( {isLoaded} ) {
  const dispatch = useDispatch();
const user = useSelector(state => state.session.user)

const logout = (e) => {
  e.preventDefault();
  dispatch(sessionActions.logout());
};

const sessionLinks = user ? (
  <>
    <li>
      <ProfileButton user={user} />
    </li>
    <li>
      <button onClick={logout}>Log Out</button>
    </li>
  </>
) : (
  <>
     <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
      </li>
    <li>
      <NavLink to="/signup">Sign Up</NavLink>
    </li>
  </>
);
  return (
    <ul>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>
    {isLoaded && sessionLinks}
  </ul>
  )
}
