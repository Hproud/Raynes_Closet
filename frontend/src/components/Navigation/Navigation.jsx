
import ProfileButton from "../ProfileButton/ProfileButton"
import {  useNavigate } from 'react-router-dom';
import './Navigation.css'
import CartButton from "../Cart/CartButton";
import { useSelector } from "react-redux";




export default function Navigation( {isLoaded} ) {
const navigate=useNavigate()
const user = useSelector(state => state.session?.user)
const admin = useSelector(state=> state.session?.user?.isAdmin);
const master = useSelector(state => state.session?.user?.isMaster)
  return (

      <div className="navcom">
        <img className='logo' src="https://res.cloudinary.com/dxbirmmv1/image/upload/v1713331614/raynes_closet_logo_jciz11.png" onClick={()=> navigate('/')}></img>
      <h1>Raynes Closet</h1>
    {isLoaded && (
    <ul>
      {!master && !admin && user &&  (
        <li>
        <CartButton />
      </li>

      )}

      <li>
          <ProfileButton />
        </li>
  </ul>
      )}
      </div>

  )
}
