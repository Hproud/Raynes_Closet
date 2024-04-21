import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { placeOrder } from "../../store/order";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allCartItems = useSelector((state) => state.cart?.cartItems);
  const cart = useSelector((state) => state.cart?.cart);
  const user = useSelector((state) => state.session?.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [cardNumber, setCardNumber] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [address, setaddress] = useState(user.address);
  const [city, setCity] = useState(user.city);
  const [state, setState] = useState(user.state);
  const [zipCode, setZipCode] = useState(user.zipcode);
  const [errors, setErrors] = useState({});
  // console.log(allCartItems,'+++++++++++++++++++++++++++++++++')

  let subtotal = 0;
  if (allCartItems) {
    allCartItems.map((item) => {
      subtotal += item.quantity * item.prodInfo.price;
    });
  }

  const tax = 0.09 * subtotal;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();

    const order = {
      cart_id: cart.cart_id,
      total: total,
    };

    dispatch(placeOrder(order));
    navigate("/");
  };

  useEffect(() => {
    let errs = {};
    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;

    if (!cardNumber || cardNumber.length !== 16) {
      errs.cardNumber = "Please enter a 16-digit card number";
    }
    if (!expMonth || expMonth.length !== 2) {
      errs.expMonth = "Expiration Month must be in 2-digit format (MM)";
    }
    if (expMonth && Number(expMonth) > 12) {
      errs.expMonth = "Please Enter A Valid Month";
    }
    if (!expYear || expYear.length !== 4) {
      errs.expYear = "Expiration Year must be in 4-digit format (YYYY)";
    }
    if (expYear && expYear.length === 4 && expMonth && expYear < currYear) {
      errs.card = "Card is Expired";
    }

    if (
      expMonth &&
      expYear &&
      expYear.length === 4 &&
      Number(expMonth) < currMonth
    ) {
      if (expYear <= currYear) {
        errs.card = "Card is Expired";
      }
    }

    if (!cvv || cvv.length !== 3) {
      errs.cvv = "Please enter a valid CVV code";
    }
    if (!zipCode || zipCode.length !== 5) {
      errs.zipCode = "Please enter a valid 5-digit ZipCode.";
    }
    return setErrors(errs);
  }, [cardNumber, expMonth, expYear, cvv, zipCode]);

  // console.log(subtotal,'this is the subtotal in checkout ')
  // console.log(tax,'tax')
  // console.log(total,'this is the total in checkout')

  return (
    <div className="chkout">
      <h1 style={{ fontSize: "45pt" }}>Checkout</h1>
      <h4 style={{ fontSize: "30pt" }}>Order Summary: </h4>
      {allCartItems &&
        allCartItems.map((item) => (
          <div key={`cart/${item.id}`} className="checkoutitem">
            <img
              src={item.prodInfo.Images[0].url}
              style={{ height: "150px", width: "150px" }}
            />
            <p style={{ fontSize: "20pt", fontWeight: "bold" }}>
              {item.prodInfo.name}
            </p>
            <p style={{ fontSize: "20pt", fontWeight: "bold" }}>
              Quantity: {item.quantity}
            </p>
            <p style={{ fontSize: "20pt", fontWeight: "bold" }}>
              $ {(item.prodInfo.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      <div>
        <div>
          <div style={{ height: "60px" }}>
            <h3>Subtotal: </h3>
            <p>$ {subtotal.toFixed(2)}</p>
          </div>
          <div className="taxz">
            <h3>Sales Tax: </h3>
            <p>$ {tax.toFixed(2)}</p>
          </div>
          <div className="ttle">
            <h3>Total: </h3>
            <p>$ {total.toFixed(2)}</p>
          </div>
        </div>
        <hr color="black" style={{ position: "relative", bottom: "150px" }} />
        <form className="pymtform" onSubmit={handleSubmit}>
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
            First Name:{" "}
          </label>
          <br />
          <input
            type="text"
            required={true}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
            Last Name:
          </label>
          <br />
          <input
            type="text"
            required={true}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          {errors && (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15pt" }}>
              {errors.cardNumber}
            </p>
          )}
          {errors && (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15pt" }}>
              {errors.card}
            </p>
          )}
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
            Card Number:{" "}
          </label>
          <br />
          <input
            type="Number"
            minLength={16}
            maxLength={16}
            required={true}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          {errors && (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15pt" }}>
              {errors.expMonth}
            </p>
          )}
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
            Exp Month:{" "}
          </label>
          <br />
          <input
            type="Number"
            minLength={2}
            maxLength={2}
            required={true}
            value={expMonth}
            onChange={(e) => setExpMonth(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          {errors && (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15pt" }}>
              {errors.expYear}
            </p>
          )}
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
            Exp Year:{" "}
          </label>
          <br />
          <input
            type="Number"
            minLength={2}
            maxLength={2}
            required={true}
            value={expYear}
            onChange={(e) => setExpYear(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          {errors && (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15pt" }}>
              {errors.cvv}
            </p>
          )}
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>CVV</label>
          <br />
          <input
            type="Number"
            minLength={3}
            maxLength={3}
            required={true}
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
            Billing Address:{" "}
          </label>
          <br />
          <input
            type="text"
            required={true}
            value={address}
            onChange={(e) => setaddress(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>City: </label>
          <br />
          <input
            type="text"
            required={true}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>State:</label>
          <br />
          <input
            type="text"
            required={true}
            value={state}
            onChange={(e) => setState(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          {errors && (
            <p style={{ color: "red", fontWeight: "bold", fontSize: "15pt" }}>
              {errors.zipCode}
            </p>
          )}
          <label style={{ fontWeight: "bold", fontSize: "15pt" }}>
            ZipCode
          </label>
          <br />
          <input
            type="Number"
            minLength={5}
            maxLength={5}
            required={true}
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          />
          <br />
          <br />
          <button
            style={{
              width: "400px",
              height: "60px",
              fontSize: "30pt",
              fontWeight: "bold",
              fontStyle: "italic",
              backgroundColor: "sandybrown",
              borderRadius: "30px",
            }}
            type="submit"
            disabled={Object.values(errors).length}
          >
            Checkout
          </button>
        </form>
      </div>
    </div>
  );
}
