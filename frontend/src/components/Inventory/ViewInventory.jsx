import { useDispatch } from "react-redux";
import {  useEffect } from "react";
import { useSelector } from "react-redux";
import { allInv } from "../../store/inventory";
import {  useNavigate } from "react-router-dom";





export default function ViewInventory() {
const dispatch = useDispatch()
const inventory = useSelector(state => state.inventory?.products)
const navigate = useNavigate()

useEffect(()=>{
    dispatch(allInv())
},[dispatch])

const editQ = (id) =>{
navigate(`/inventory/${id}`)
}

    return (
    <div>
        <ul>

        {inventory && inventory.map((item)=>(
            <li key={item.id}>
                <div>
                    <h3>{item.product.name}</h3>
                    <div><h4>Size</h4><p>{item.product.size}</p></div>
                    <div><h4>type</h4><p>{item.product.type}</p></div>
                    <div><h4>Quantity:</h4><p>{item.quantity}</p></div>
                    <button onClick={()=>editQ(item.product.id)}>Update Quantity</button>{" "}
                    <button>delete</button>
                </div>
            </li>
        ))}
        </ul>
    </div>
  )
}
