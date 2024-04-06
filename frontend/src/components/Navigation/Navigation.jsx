
import { useDispatch, useSelector } from 'react-redux'
import ProfileButton from "../ProfileButton/ProfileButton"
import { NavLink } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';



export default function Navigation( {isLoaded} ) {
  const dispatch = useDispatch();
const user = useSelector(state => state.session.user)



const sessionLinks = user ? (
  <>
    <li>
      <ProfileButton user={user} />
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
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
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
