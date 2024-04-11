import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import { useEffect } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import AddInventory from "../Inventory/AddInventory";




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
    <>
      <button>
        <CgProfile onClick={toggleMenu} />
      </button>
      {showMenu && user && (
        <ul>
          <li>Hello, {user.username}</li>
          <li>
            {user.firstName} {user.lastName}
          </li>
          <li>{user.email}</li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
          {isMaster && (
            <>
              <button onClick={()=> navigate('/products/add')}>Add A Product</button>
              <br />
              <button>View Inventory</button>
              <br />
              <button>Add Admin</button>
            </>
          )}
          {!isMaster && admin && (
            <div>
              <button onClick={()=> navigate('/products/add')}>Add A Product</button>
              <br />
              <button>View Inventory</button>
            </div>
          )}
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
    </>
  );
} //end of return
