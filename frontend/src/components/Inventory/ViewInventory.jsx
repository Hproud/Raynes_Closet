import { useDispatch } from "react-redux";
import {  useEffect } from "react";
import { useSelector } from "react-redux";
import { allInv } from "../../store/inventory";
import {  useNavigate } from "react-router-dom";
import './inventory.css'




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
            <li key={item.id} className="lst">
                <div>
                    <h3 style={{textDecoration:'underline',fontSize:'25pt',display:'flex',justifyContent:'center'}}>{item.product.name}</h3>
                    <div style={{position:'relative',right:'80px'}}>

                    <div className="invsize"><h4 style={{fontSize:'13pt'}}>Size:</h4><p style={{position:'relative',left:'12px'}}>{item.product.size}</p></div>
                    <div className="invtype">
                        <h4>Type:</h4><p>{item.product.type}</p></div>
                    <div className="invquant"><h4>Quantity:</h4><p className="qnt">{item.quantity}</p></div>
                    </div>
                    <button className="updtbuttons"  onClick={()=>editQ(item.product.id)} style={{background:'saddlebrown'}} >Update Quantity</button>{" "}
                    {/* <button className="updtbuttons" style={{background:'red',fontSize:'12pts',position:'relative'}}>Delete</button> */}
                </div>
                <br/>
                <br/>
            </li>
        ))}
        </ul>
    </div>
  )
}
