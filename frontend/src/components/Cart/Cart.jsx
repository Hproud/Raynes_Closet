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
  // console.log(quant,'this is the quant in minus')
  // console.log(itemId,'this is the itemid in the minus')
  if(quant > 1){
const newnum = quant - 1;
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
    <div className="cartdropDown" style={{position:'absolute',float:'top',borderRadius:'10px'}}>
      <h2 className="title">Cart</h2>
      <hr color="black"/>
      <ul>

{cartItems && cartItems.map((item)=>(

<li key={item.prodInfo.id} style={{display: 'flex', height:'150px'}} className="Item">
  <img src={item.prodInfo?.Images[0].url} style={{height:'80px',width:'70px',position:'relative',right:'30px',padding:'10px'}}/>
  <p className="itemname">{item.prodInfo?.name}</p>
  <p className="size">Size: {item.prodInfo?.size}</p>
  <div className="quants"><button style={{background:'none', border: 'none'}} onClick={()=> minus(item.prodInfo.id,item.quantity,)}><BiSolidMinusCircle size={'1.3em'}/></button>
  <p style={{position:'relative',bottom:'15px'}}>{item?.quantity}</p>
  <button style={{background:'none', border:'none',position:'relative',top: '1px'}}   onClick={()=> plus(item.prodInfo,item.quantity)}><BsFillPlusCircleFill size={'1.1em'} /></button></div>
  <p className="prixe">$ {(item?.quantity * item.prodInfo?.price).toFixed(2)}</p>

</li>
))}
</ul>
{cartItems && (

  <div>
<hr color="black"/>
<h3 style={{fontWeight:'bold',position:'relative',bottom:'15px',left:'20px'}}>Subtotal: </h3>
<p style={{fontWeight:'bold', position:'relative',left: '330px',bottom:'55px'}}>$ {subtotal.toFixed(2)}</p>
</div>
)}
{!cartItems && (
  <p4>No items in cart!</p4>
)}
    </div>
  )
}
