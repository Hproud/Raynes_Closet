import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMyOrder } from "../../store/order";
import './orders.css'


export default function OrderInfoPage() {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const order = useSelector((state) => state.order?.order);
  

  useEffect(() => {
    dispatch(getMyOrder(orderId));
  }, [dispatch, orderId]);

  const cart = order?.cart;


  let subtotal = 0;
  if (cart) {
    cart.map((item) => {
      const price = (item.price) * (item.quantity);
      subtotal += price;
    });
  }

  const tax = subtotal * 0.09;

  return (
    <div>
        <Link to={'/orders'}>Back</Link>
        {order && (
<div>

            <h1>Order No. # {orderId}</h1>
      <div>
        <h3>Customer: </h3>{" "}
        <p>
          {order?.user?.firstName} {order?.user?.lastName}
        </p>
      </div>
      <div>
        <h3>Subtotal: </h3>
        <p>$ {subtotal.toFixed(2)}</p>
      </div>
      <div>
        <h3>Sales Tax: </h3>
        <p>$ {tax.toFixed(2)}</p>
      </div>
      <div>
        <h3>Order Total:</h3> <p>$ {order.total.toFixed(2)}</p>
      </div>
      <div>
        <h3>Order Status:</h3>
        <p>{order?.status}</p>
      </div>
      <div>
        <h3>Order Placed: </h3>
        <p>{order.createdAt.slice(0, 10)}</p>
      </div>
      <div>
        <ul>
          {order.cart &&
            order.cart.map((item) => (
                <li key={item.id}>
                <h5>{item.Product?.name}</h5>
                <img style={{height:'50px',width:'50px'}} src={item.Product?.Images[0].url} />
                <p>{item.size}</p>
                <p>{item.quantity}</p>
                <p>$ {(item.price * item.quantity).toFixed(2)}</p>
              </li>
            ))}
        </ul>
      </div>
      <div></div>
            </div>   )}
    </div>
  );
}
