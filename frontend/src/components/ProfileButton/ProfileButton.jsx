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
import "./profileButton.css";

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
    <div style={{ position: "absolute" }}>
      <button className="proButton">
        <CgProfile size={"2em"} onClick={toggleMenu} />
      </button>
      <div style={{ position: "relative" }}>
        {showMenu && user && (
          <ul
            style={{
              backgroundColor: "bisque",
              borderRadius: "30px",
              height: "300px",
            }}
          >
            <li style={{position:'relative',top:'40px'}}>Hello, {user.username}</li>
            <li style={{position:'relative',top:'40px'}}>
              {user.firstName} {user.lastName}
            </li>
            <li style={{position:'relative',top:'40px'}}>{user.email}</li>
            {user && !isMaster && !admin && (
              <div>
                <Link style={{ color: "blue",position:'relative', top:'45px' }} to={"/orders"}>
                  My Orders
                </Link>
                <br />
                <Link style={{ color: "blue",position:'relative', top:'45px' }} to={"/suggestions"}>
                  My Suggestions
                </Link>
              </div>
            )}
            {isMaster && (
              <div>
                <Link style={{ color: "blue",position:'relative', top: '45px' }} to="/orders">
                  Orders
                </Link>
                <br />
                {/* <button onClick={()=> navigate('/products/add')}>Add A Product</button> */}
                <Link style={{ color: "blue",position:'relative', top: '45px' }} to={"/products/add"}>
                  Add A Product
                </Link>
                <br />
                <Link style={{ color: "blue",position:'relative', top: '45px' }} to="/inventory">
                  View Inventory
                </Link>
                <br />
                <Link style={{ color: "blue",position:'relative', top: '45px' }} to={"/suggestions"}>
                  Suggestions
                </Link>
                <br />
                <Link style={{ color: "blue",position:'relative', top: '45px' }} to={"/admins"}>
                  Admins
                </Link>
              </div>
            )}
            {!isMaster && admin && (
              <div>
                <Link style={{ color: "blue",position:'relative', top:'45px' }} to={"/orders"}>
                  Orders
                </Link>
                <br />
                {/* <button onClick={()=> navigate('/products/add')}>Add A Product</button> */}
                <Link style={{ color: "blue",position:'relative', top:'45px' }} to={"/products/add"}>
                  Add A Product
                </Link>
                <br />
                <Link style={{ color: "blue",position:'relative', top:'45px' }} to="/inventory">
                  View Inventory
                </Link>
                <br />
                <Link style={{ color: "blue",position:'relative', top:'45px' }} to={"/suggestions"}>
                  Suggestions
                </Link>
                <br />
              </div>
            )}
            <li>
              <button
                style={{
                  position: "relative",
                  top: "55px",
                  width: "150px",
                  height: "40px",
                  right: "20px",
                  borderRadius: "20px",
                  backgroundColor: "sandybrown",
                }}
                onClick={logout}
              >
                Log Out
              </button>
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
      </div>
    </div>
  );
} //end of return
