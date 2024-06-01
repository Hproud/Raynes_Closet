// import { useNavigate } from "react-router-dom"
import { BsFillPlusCircleFill } from "react-icons/bs";
import { BiSolidMinusCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/cart";
import { getAllCartItems, removeCartItem,updateTheCartItem } from "../../store/cartItems";
import "./cart.css";

export default function Cart({ cartItems, subtotal, cart }) {

  const dispatch = useDispatch();

  const minus = (itemId, quant) => {

if (quant > 1) {

      const newnum = quant - 1;
      const newQ = { quantity: newnum };
      dispatch(updateTheCartItem(cart.cart_id, itemId, newQ));
      dispatch(getAllCartItems())

    }
    if (quant === 1) {
      dispatch(removeCartItem(cart.cart_id, itemId));

    }
  };

  const plus = (prod, quantity) => {
    const item = {
      item_id: prod.id,
      size: prod.size,
      price: prod.price,
      quantity: quantity + 1,
    };


    dispatch(addItem(cart.cart_id, item));
    dispatch(getAllCartItems())

  };

  return (
    <div
      className="cartdropDown"
      style={{ position: "absolute", float: "top", borderRadius: "10px" }}
    >
      <h2 className="title">Cart</h2>
      <hr color="black" />
      <ul>
        {cartItems &&
          cartItems.map((item) => (
            <li
              key={item.prodInfo.id}
              style={{
                display: "flex",
                height: "150px",
                justifyItems: "center",
                alignItems: "center",
              }}
              className="Item"
            >
              <img
                src={item.prodInfo?.Images[0].url}
                style={{
                  height: "80px",
                  width: "70px",
                  position: "relative",
                  right: "30px",
                  padding: "10px",
                }}
              />
              <p className="itemname">{item.prodInfo?.name}</p>
              <p className="size">Size: {item.prodInfo?.size}</p>
              <div className="quants">
                <button
                  style={{ background: "none", border: "none" }}
                  onClick={() =>{
                    console.log(item.quantity);minus(item.prodInfo.id, item.quantity)}}
                >
                  <BiSolidMinusCircle size={"1.3em"} />
                </button>
                <p style={{ position: "relative", bottom: "15px" }}>
                  {item?.quantity}
                </p>
                <button
                  style={{
                    background: "none",
                    border: "none",
                    position: "relative",
                    top: "1px",
                  }}
                  onClick={() => plus(item.prodInfo, item.quantity)}
                >
                  <BsFillPlusCircleFill size={"1.1em"} />
                </button>
              </div>
              <p className="prixe">
                $ {(item?.quantity * item.prodInfo?.price).toFixed(2)}
              </p>
            </li>
          ))}
      </ul>
      {cartItems && (
        <div>
          <hr color="black" />
          <h3
            style={{
              fontWeight: "bold",
              position: "relative",
              bottom: "15px",
              left: "20px",
            }}
          >
            Subtotal:{" "}
          </h3>
          <p
            style={{
              fontWeight: "bold",
              position: "relative",
              left: "330px",
              bottom: "55px",
            }}
          >
            $ {subtotal.toFixed(2)}
          </p>
        </div>
      )}
      {!cartItems && <p4>No items in cart!</p4>}
    </div>
  );
}
