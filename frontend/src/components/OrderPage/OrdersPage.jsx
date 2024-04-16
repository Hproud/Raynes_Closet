import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getAllOrders, myOrders } from "../../store/order"
import { Link } from "react-router-dom"
export default function OrdersPage() {
    const dispatch = useDispatch()
  const user = useSelector(state => state.session?.user)
const admin = user.isAdmin
const master = user.isMaster
const orders = useSelector(state => state.order?.orders)

useEffect(()=>{
if(admin || master){
    dispatch(getAllOrders)
}else{
dispatch(myOrders)
}

},[admin,master])


return (
    <div>
<h1>Orders</h1>
        <ul>
        {orders && orders.map((order)=>(
            <li key={order.id} >
                <div>
<hr/>
            <h3 style={{height:'5px'}}>Order No# : {order.id}</h3> <Link style={{position:'relative',left:'150px',bottom:'23px'}}>View</Link>
<hr/>
               </div>
            <div >
                <div style={{display:'flex',height:'30px'}}>
            <h4>Customer Name:</h4>
            <p style={{position:'relative',left:'20px',top:'6px'}}> {order.user.firstName} {order.user.lastName}</p>
                </div>
            <div style={{display:'flex',height:'30px'}}>
                <h4>Total: </h4><p style={{position:'relative',left:'20px',top:'4px'}}>$ {(order.total).toFixed(2)}</p>
            </div>
            <div style={{display:'flex',height:'30px'}}>
                <h4>Order Status: </h4><p style={{position:'relative',left:'20px',top:'6px'}}>{order.status}{" "}{admin || master && (<button style={{position:'relative', left:'10px'}} disabled={order.status === 'Refunded' || order.status === 'Canceled'}>Update</button>)}</p>
            </div>
            <div style={{display:'flex',height:'30px'}}>
                <h4>Ordered At: </h4><p style={{position:'relative',left:'20px',top:'6px'}}>{(order.createdAt).slice(0,10)}</p>
                    </div>
            </div>
            <br/>
            <br/>
           </li>
        ))}
        </ul>
    </div>
  )
}
