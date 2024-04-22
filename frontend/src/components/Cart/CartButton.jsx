import { useEffect, useState, useRef } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cart from "./Cart";
import { createCart, getCurrCart } from "../../store/cart";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function CartButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  // const user = useSelector(state => state.session?.user)
  const product = useSelector((state) => state.products?.product);
  const cart = useSelector((state) => state.cart?.cart);
  const allCartItems = useSelector((state) => state.cart?.cartItems);
  // const products = useSelector(state => state.products?.products)
  let totalItems = 0;
  let subtotal = 0;
  if (allCartItems) {
    allCartItems.map((item) => {
      totalItems += item.quantity;
      subtotal += item.prodInfo.price * item.quantity;
    });
  }
  // console.log(subtotal,'this is the subtotal')

  // console.log(totalItems,'------------------')

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    dispatch(getCurrCart()).catch(async (res) => {
      const error = await res.json();
      console.log(error, "this is an error");
    });
    if (!cart) {
      dispatch(createCart);
    }
  }, [dispatch, allCartItems?.length]);

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
      <button onClick={toggleMenu} style={{background:'none', border:'none',position:'absolute',top:'58px'}}>
        <p style={{ fontWeight: "bold", background:'none', position:'relative', right:'25px' }}>
          <FaShoppingCart style={{position:'relative',top:'6px'}} size={"1.5em"} /> · {totalItems}
        </p>
      </button>
      {showMenu && (
        <div className={ulClassName} hidden={!showMenu} ref={ulRef} style={{position:'absolute'}}>
          <Cart
            cart={cart}
            cartItems={allCartItems}
            subtotal={subtotal}
            product={product}

          />
          {allCartItems && (
            <div className="checkoutbuttons">
              <button style={{width:'150px',height:'30px',fontWeight:'bold',
            backgroundColor:'sandybrown'}} onClick={checkout}>Checkout</button>{" "}
              {" "}<button style={{width: '150px', height:'30px',position:'relative',left:'20px', fontWeight:'bold',
            backgroundColor:'sandybrown'}} onClick={addItems}>Add More Items</button>
            </div>
          )}
          {!allCartItems && cart && (
            <button onClick={addItems}>Add Prouducts</button>
          )}
        </div>
      )}
    </div>
  );
}
