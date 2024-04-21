import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllOrders, myOrders } from "../../store/order";
import { Link, useNavigate } from "react-router-dom";
import "./orders.css";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session?.user);
  const admin = user.isAdmin;
  const master = user.isMaster;
  const orders = useSelector((state) => state.order?.orders);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin || master) {
      dispatch(getAllOrders);
    } else {
      dispatch(myOrders);
    }
  }, [admin, master]);

  return (
    <div>
      <h1 className="orderpage">Orders</h1>
      <ul>
        {orders &&
          orders.map((order) => (
            <li key={order.id}>
              <div>
                <hr color="black" />
                <h3 style={{ height: "5px" }}>Order No# : {order.id}</h3>{" "}
                <Link
                  to={`/orders/${order.id}`}
                  order={order}
                  style={{
                    position: "relative",
                    left: "150px",
                    bottom: "23px",
                  }}
                >
                  View
                </Link>
                <hr color="black" />
              </div>
              <div>
                <div style={{ display: "flex", height: "30px" }}>
                  <h4>Customer Name:</h4>
                  <p style={{ position: "relative", left: "20px", top: "6px" }}>
                    {" "}
                    {order.user.firstName} {order.user.lastName}
                  </p>
                </div>
                <div style={{ display: "flex", height: "30px" }}>
                  <h4>Total: </h4>
                  <p style={{ position: "relative", left: "98px", top: "4px" }}>
                    $ {order.total.toFixed(2)}
                  </p>
                </div>
                <div style={{ display: "flex", height: "30px" }}>
                  <h4>Order Status: </h4>
                  <p
                    className={order.status}
                    style={{position:'relative',left:'45px'}}
                  >
                    {order.status}{" "}
                    {(admin || master) && (
                      <button
                      className="button"

                        hidden={
                          order.status === "Refunded" ||
                          order.status === "Canceled"
                        }
                        onClick={() => navigate(`/orders/${order.id}/edit`)}
                      >
                        Update
                      </button>
                    )}
                  </p>
                </div>
                <div style={{ display: "flex", height: "30px" }}>
                  <h4>Ordered At: </h4>
                  <p style={{ position: "relative", left: "55px", top: "6px" }}>
                    {order.createdAt.slice(0, 10)}
                  </p>
                </div>
              </div>
              <br />
              <br />
            </li>
          ))}
      </ul>
    </div>
  );
}
