import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getOneInv, updateQ } from "../../store/inventory"
import './inventory.css'
export default function EditInv() {
    const {itemId} = useParams()
    const product = useSelector(state => state.inventory?.product)
const prod = useSelector(state => state.products?.product)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity,setQuantity] = useState()

// console.log(itemId,'this is the product')

    useEffect(()=>{
        dispatch(getOneInv(itemId))
    },[dispatch,itemId])

console.log(prod,'this is the product')


const handleSubmit = (e) =>{
e.preventDefault();
console.log(quantity)
dispatch(updateQ(itemId,{quantity: quantity}))
navigate('/inventory')
}



  return (
    <div>
        <Link to={'/inventory'}>Back</Link>

        {product && (
            <div>
<br/>
            <form onSubmit={handleSubmit}>
<label style={{fontWeight:'bold'}}>Product Name: </label> <p style={{fontWeight:'bold',fontSize: '25pt',position:'relative',bottom:'25px'}}>{product?.Product?.name}</p>
<br/>
<img src={prod?.images[0].url} style={{height:'300px', width: '300px', position:'relative', bottom:'25px'}}/>

<br/>
<br/>
<label style={{fontWeight:'bold'}}>Size: </label> <p style={{position:'relative',bottom:'10px'}}>{product?.Product?.size}</p>
<label style={{fontWeight:'bold'}} >New Quantity: </label>
<br/>
<input
type='number'
// value={quantity}
onChange={(e)=> setQuantity(e.target.value)}
style={{backgroundColor:'sandybrown'}}
/>
<br/>
<button className="udi" type="submit">Update Inventory</button>
        </form>
    </div>
)}
</div>
  )
}
