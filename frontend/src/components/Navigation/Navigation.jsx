
import ProfileButton from "../ProfileButton/ProfileButton"
import {  useNavigate } from 'react-router-dom';
import './Navigation.css'
import CartButton from "../Cart/CartButton";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import SuggestionModal from "../Suggestions/SuggestionModal";


export default function Navigation( {isLoaded} ) {
const navigate=useNavigate()
const user = useSelector(state => state.session?.user)
const admin = useSelector(state=> state.session?.user?.isAdmin);
const master = useSelector(state => state.session?.user?.isMaster)
  return (

      <div className="navcom">
        <img className='logo' src="https://res.cloudinary.com/dxbirmmv1/image/upload/v1713331614/raynes_closet_logo_jciz11.png" onClick={()=> navigate('/')} ></img>
      <h1 style={{fontSize:'50pt',fontFamily:'san sherif',fontStyle:'italic',position:'relative',right:'25px'}}>Raynes Closet</h1>
    {isLoaded && (
    <ul>
      {!master && !admin && user &&  (
        <div>

        <li style={{position:'relative', bottom:'53px'}}>
        <CartButton />
      </li>
<li style={{position:'relative'}}>
  <div className="sugg">
  <OpenModalButton
  buttonText='Have a Suggestion?'
  modalComponent={<SuggestionModal/>}
  onClick={() => {<SuggestionModal/>}}
  />
  </div>
</li>
  </div>

      )}
      <li className="profile" >
          <ProfileButton />
        </li>
  </ul>
      )}
      </div>

  )
}
