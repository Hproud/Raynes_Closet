
import ProfileButton from "../ProfileButton/ProfileButton"
import { NavLink, useNavigate } from 'react-router-dom';
import './Navigation.css'




export default function Navigation( {isLoaded} ) {
const navigate=useNavigate()
  return (

      <div className="navcom">
        <img className='logo' src="/raynes_closet_logo.png" onClick={()=> navigate('/')}></img>
      <h1>Raynes Closet</h1>
    <ul>
    <li>
      <NavLink to="/">Home</NavLink>
    </li>

    {isLoaded && (
      <li>
          <ProfileButton />
        </li>
      )}
  </ul>
      </div>

  )
}
