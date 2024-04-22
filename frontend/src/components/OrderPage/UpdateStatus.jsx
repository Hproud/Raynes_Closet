import { getMyOrder } from "../../store/order";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import { editStatus } from "../../store/order";
import './orders.css'



export default function UpdateStatus() {
    const order = useSelector((state) => state.order?.order);
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const [status,setStatus] = useState(order?.status)
const navigate = useNavigate()



    useEffect(() => {
        dispatch(getMyOrder(orderId));
      }, [dispatch, orderId]);



const handleSubmit = (e) =>{
    e.preventDefault();
    if(status === 'Refunded' || status === 'Canceled'){
        if(window.confirm(`You are Setting Order No ${orderId}'s Status to ${status}. Be Aware Once you Change this order to this status the action CAN NOT be Undon. Would You Like to Continue?`)){
            dispatch(editStatus(orderId, status))
            navigate(`/orders/${orderId}`)
        }
    }else{
        window.confirm(`You are changind Order No ${orderId}'s Status to ${status}. Are You Sure You Would Like Update This Status?`)
        dispatch(editStatus(orderId,status))
        navigate(`/orders/${orderId}`)
    }
}



  return (
    <div className="chgstat">
        {order && (
            <div>
            <h1 style={{textDecoration:'underline'}}> Order No # {orderId}</h1>
        <form onSubmit={handleSubmit}>
            <label style={{fontWeight:'bold'}}>User: {order.user.firstName} {order.user.lastName}</label>
            <br/>
            <br/>
    <label style={{fontWeight:'bold'}}>Order Total: $ {(order.total).toFixed(2)}</label>
    <br/>
    <br/>
    <label style={{fontWeight:'bold'}}>Order Status: </label>
    <select
    className="status"
    value={status}
    onChange={(e)=> setStatus(e.target.value)}
    >
        <option>Pending</option>
        <option>Fufilled</option>
        <option>Refunded</option>
        <option>Canceled</option>
    </select>
    {" "}
    <button type="submit" className="statbutton">Update</button>
        </form>
        </div>
    )}
    </div>
  )
}
