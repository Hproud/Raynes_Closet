import { useEffect, useState, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cart from "./Cart";
import { createCart, getCurrCart } from "../../store/cart";
import { useNavigate } from "react-router-dom";
import "./cart.css";
import { getAllCartItems } from "../../store/cartItems";

export default function CartButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  // const user = useSelector(state => state.session?.user)
  const product = useSelector((state) => state.products?.product);
  const cart = useSelector((state) => state.cart?.cart);
  // const allCartItems = useSelector((state) => state.cart?.cartItems);
  const crtItms = useSelector((state) => state.cartItems?.data)
  // const products = useSelector(state => state.products?.products)
  const allitms = Object.values(crtItms)
  let totalItems = 0;
  let subtotal = 0;
  if (allitms) {
    allitms.map((item) => {
      totalItems += item.quantity;
      subtotal += item.prodInfo.price * item.quantity;
    });
  }


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    dispatch(getCurrCart())
    dispatch(getAllCartItems())

   
    if (!cart) {
      dispatch(createCart);
    }
  }, [dispatch, allitms?.length]);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, dispatch]);

  const ulClassName = "cart-dropdown" + (showMenu ? "" : " hidden");

  const addItems = () => {
    navigate("/");
    setShowMenu(!showMenu);
  };

  const checkout = () => {
    navigate("/checkout");
    setShowMenu(!showMenu);
  };

  return (
    <div>
      <button
        onClick={toggleMenu}
        style={{
          background: "none",
          border: "none",
          position: "absolute",
          top: "58px",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            background: "none",
            position: "relative",
            right: "25px",
          }}
        >
          <FaShoppingCart
            style={{ position: "relative", top: "6px" }}
            size={"1.5em"}
          />{" "}
          · {totalItems}
        </p>
      </button>
      {showMenu && (
        <div
          className={ulClassName}
          hidden={!showMenu}
          ref={ulRef}
          style={{ position: "absolute" }}
        >
          <Cart
            cart={cart}
            cartItems={allitms}
            subtotal={subtotal}
            product={product}
          />
          {allitms && (
            <div className="checkoutbuttons">
              <button
                style={{
                  width: "150px",
                  height: "30px",
                  fontWeight: "bold",
                  backgroundColor: "sandybrown",
                  position: "relative",
                  right: "20px",
                  borderRadius: "10px",
                }}
                onClick={checkout}
              >
                Checkout
              </button>{" "}
              <button
                style={{
                  width: "150px",
                  height: "30px",
                  position: "relative",
                  fontWeight: "bold",
                  backgroundColor: "sandybrown",
                  left: "50px",
                  borderRadius: "10px",
                }}
                onClick={addItems}
              >
                Add More Items
              </button>
            </div>
          )}
          {!allitms && cart && (
            <button onClick={addItems}>Add Prouducts</button>
          )}
        </div>
      )}
    </div>
  );
}
