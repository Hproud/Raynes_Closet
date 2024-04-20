// import { useNavigate } from "react-router-dom"
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidMinusCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { removeItem, updateCartItem, addItem } from "../../store/cart";
import './cart.css'




export default function Cart({cartItems,subtotal,cart}) {
// const navigate = useNavigate();
const dispatch = useDispatch()
// let quant = 0
// if(cartItems){
//   cartItems.map((item)=>{
//     quant += item.quantity
//   })
// }
// console.log(quant,'this is the cart in the dropdown')
const minus = (itemId,quant) => {
  console.log(quant,'this is the quant in minus')
  console.log(itemId,'this is the itemid in the minus')
  if(quant > 1){
const newnum =quant - 1;
    const newQ= {quantity: newnum}
    dispatch(updateCartItem(cart.cart_id,itemId,newQ)).catch(async(res)=>{
      const error = await res.json()
      console.log(error,'error in minus')
    })
  }
  if(quant === 1){
    dispatch(removeItem(cart.cart_id,itemId)).catch(async(res)=>{
      const error = await res.json()
      console.log(error,'error in minus1')
    })
  }
}


const plus=(prod,quantity)=> {
  const item ={
    item_id: prod.id,
    size: prod.size,
    price: prod.price,
    quantity: quantity +1
  }

  console.log(cart,'this is the prod in plus')
dispatch(addItem(cart.cart_id,item)).catch(async (res)=>{
    const error = await res.json()
    console.log(error)
})
}


  return (
    <div className="cartdropDown" style={{position:'absolute',float:'top'}}>
      <h2>Cart</h2>
      <ul>

{cartItems && cartItems.map((item)=>(

<li key={item.prodInfo.id}>
  <img src={item.prodInfo?.Images[0].url} style={{height:'50px',width:'50px'}}/>
  <p>{item.prodInfo?.name}</p>
  <p>{item.prodInfo?.size}</p>
  <div><button onClick={()=> minus(item.prodInfo.id,item.quantity,)}><BiSolidMinusCircle /></button></div>
  <p>{item?.quantity}</p>
  <div><button onClick={()=> plus(item.prodInfo,item.quantity)}><BsFillPlusCircleFill /></button></div>
  <p>$ {(item?.quantity * item.prodInfo?.price).toFixed(2)}</p>
  <hr />
</li>
))}
</ul>
{cartItems && (

  <div>
<h3>Subtotal: </h3>
<p>$ {subtotal.toFixed(2)}</p>
</div>
)}
{!cartItems && (
  <p4>No items in cart!</p4>
)}
    </div>
  )
}
