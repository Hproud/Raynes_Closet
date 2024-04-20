import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
// import AddInventory from "../Inventory/AddInventory";
import { Link } from "react-router-dom";
import './profileButton.css'


export default function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const isMaster = user?.isMaster;
  // console.log(isMaster,'masterrrrr')
  const admin = useSelector((state) => state.session?.user?.isAdmin);

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

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button className="proButton">
        <CgProfile size={'2em'} onClick={toggleMenu} />
      </button>
      <div style={{position:'relative'}}>

      {showMenu && user && (
        <ul style={{backgroundColor:'bisque',borderRadius: '30px',height:'200px'}}>
          <li>Hello, {user.username}</li>
          <li>
            {user.firstName} {user.lastName}
          </li>
          <li>{user.email}</li>
          {user && !isMaster && !admin && (
            <div>
            <Link style={{color:'black'}} to={'/orders'}>My Orders</Link>
            <br/>
            <Link style={{color:'black'}} to={'/suggestions'}>My Suggestions</Link>
            </div>
          )}
          {isMaster && (
            <div>
            <Link style={{color:'black'}} to='/orders'>Orders</Link>
            <br/>
              {/* <button onClick={()=> navigate('/products/add')}>Add A Product</button> */}
              <Link style={{color:'black'}} to={'/products/add'}>Add A Product</Link>
              <br />
              <Link style={{color:'black'}} to='/inventory'>View Inventory</Link>
              <br />
              <Link style={{color:'black'}} to={'/suggestions'}>Suggestions</Link>
              <br/>
              <Link style={{color:'black'}} to={'/admins'}>Admins</Link>

            </div>
          )}
          {!isMaster && admin && (
            <div>
              <Link style={{color:'black'}} to={'/orders'}>Orders</Link>
            <br/>
              {/* <button onClick={()=> navigate('/products/add')}>Add A Product</button> */}
              <Link style={{color:'black'}} to={'/products/add'}>Add A Product</Link>
              <br />
              <Link style={{color:'black'}} to='/inventory'>View Inventory</Link>
              <br/>
              <Link style={{color:'black'}} to={'/suggestions'}>Suggestions</Link>
              <br/>
            </div>
          )}
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
      {showMenu && !user && (
        <ul>
          <li>
            <OpenModalButton
              buttonText='Log In'
              modalComponent={<LoginFormModal />}
              />
          </li>
          <li>
            <OpenModalButton
              buttonText='Sign Up'
              modalComponent={<SignupFormModal />}
              />
          </li>
        </ul>
      )}
      </div>
    </div>
  );
} //end of return
