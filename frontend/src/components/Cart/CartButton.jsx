import { useEffect,useState, useRef } from "react";
import { FaShoppingCart} from 'react-icons/fa'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Cart from "./Cart";
import { getCurrCart } from "../../store/cart";
import { useNavigate } from "react-router-dom";

export default function CartButton() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
	const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const user = useSelector(state => state.session?.user)
const cart = useSelector((state) => state.cart?.cart)
const allCartItems = useSelector(state => state.cart?.cartItems)
// const products = useSelector(state => state.products?.products)
let totalItems = 0
let subtotal = 0
if(allCartItems){
  allCartItems.map((item)=>{
    totalItems += item.quantity
    subtotal += (item.prodInfo.price * item.quantity)
  })
}
console.log(subtotal,'this is the subtotal')

// console.log(totalItems,'------------------')

	const toggleMenu = (e) => {
		e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
		setShowMenu(!showMenu);
	};


useEffect(()=>{
dispatch(getCurrCart()).catch(async(res) =>{
  const error = await res.json()
  console.log(error,'this is an error')
})

},[dispatch,allCartItems?.length])




  useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (ulRef.current && !ulRef.current.contains(e.target)) {
				setShowMenu(false);
			}
		};

		document.addEventListener("click", closeMenu);


		return () => document.removeEventListener("click", closeMenu);
	}, [showMenu,dispatch])


  const ulClassName = "cart-dropdown" + (showMenu ? "" : " hidden");

const addItems = () => {
  navigate('/')
  setShowMenu(!showMenu)
}


const checkout = () => {
  navigate('/checkout')
  setShowMenu(!showMenu)
}

return(
  <div>
    <button onClick={toggleMenu}><FaShoppingCart/> Cart · {totalItems}</button>
    {showMenu && (
      <div className={ulClassName} hidden={!showMenu} ref={ulRef}>
        <Cart cart={cart} cartItems={allCartItems} user={user} subtotal={subtotal}/>
        <button onClick={checkout}>Checkout</button> {" "}<button onClick={addItems}>Add More Items</button>
        </div>
    )}
  </div>
)
}
