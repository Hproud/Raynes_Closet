import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getOneInv, updateQ } from "../../store/inventory"

export default function EditInv() {
    const {itemId} = useParams()
    const product = useSelector(state => state.inventory?.product)
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [quantity,setQuantity] = useState()

// console.log(itemId,'this is the product')

    useEffect(()=>{
        dispatch(getOneInv(itemId))
    },[dispatch,itemId])




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

            <form onSubmit={handleSubmit}>
<label>Product Name: </label> <p>{product?.Product?.name}</p>
<br/>
<img src={product?.Product}/>
<label>Size: </label> <p>{product?.Product?.size}</p>
<label>New Quantity: </label>
<br/>
<input
type='number'
// value={quantity}
onChange={(e)=> setQuantity(e.target.value)}
/>
<br/>
<button type="submit">Update Inventory</button>
        </form>
    </div>
)}
</div>
  )
}
