import { imageListClasses } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"





export default function Checkout() {
const allCartItems = useSelector(state => state.cart?.cartItems)
const user = useSelector(state => state.session?.user)
const [firstName, setFirstName] = useState(user.firstName)
const [lastName, setLastName] = useState(user.lastName)
const [cardNumber, setCardNumber] = useState('')
const [expMonth, setExpMonth] = useState('')
const [expYear, setExpYear] = useState('')
const [cvv, setCvv] = useState('')
const [address, setaddress] = useState(user.address)
const [city, setCity] = useState(user.city)
const [state, setState] = useState(user.state)
const [zipCode, setZipCode] = useState(user.zipcode)
console.log(allCartItems,'+++++++++++++++++++++++++++++++++')

return (
    <div>
      <h1>Checkout</h1>
      <h4>Order Summary: </h4>
      {allCartItems && allCartItems.map((item)=>(
        <div>
          <img src={item.prodInfo.Images[0].url} style={{height:'80px',width:'80px'}} />
          <p>Quantity: {item.quantity}</p>
          <p>{item.prodInfo.name}</p>
          <p>$ {(item.prodInfo.price * item.quantity).toFixed(2)}</p>
          </div>
      ))}
      <form>
        <label>First Name: </label>
        <br/>
        <input
  type='text'
  required={true}
  value = {firstName}
  onChange={(e) => setFirstName(e.target.value)}
        />
        <br/>
        <label>Last Name:</label>
        <br/>
        <input
        type='text'
        required={true}
        value={lastName}
        onChange={(e)=> setLastName(e.target.value)}
        />
        <br/>
        <label>Card Number: </label>
        <br/>
        <input
        type="Number"
        minLength={16}
        maxLength={16}
        required={true}
        value={cardNumber}
        onChange={(e)=> setCardNumber(e.target.value)}
        />
        <br/>
        <label>Exp Month: </label>
        <br/>
        <input
        type="Number"
        minLength={2}
        maxLength={2}
        required={true}
        value={expMonth}
        onChange={(e)=>setExpMonth(e.target.value)}
        />
        <br/>
        <label>Exp Year: </label>
        <br/>
        <input
        type="Number"
        minLength={2}
        maxLength={2}
        required={true}
        value={expYear}
        onChange={(e)=>setExpYear(e.target.value)}
        />
        <br/>
        <label>CVV</label>
        <br/>
        <input
        type="Number"
        minLength={3}
        maxLength={3}
        required={true}
        value={cvv}
        onChange={(e)=>setCvv(e.target.value)}
        />
        <br/>
        <label>Billing Address: </label>
        <br/>
        <input
        type="text"
        required={true}
        value={address}
        onChange={(e)=> setaddress(e.target.value)}
        />
        <br/>
        <label>City: </label>
        <br/>
        <input
        type='text'
        required={true}
        value={city}
        onChange={(e)=> setCity(e.target.value)}
        />
        <br/>
        <label>State:</label>
        <br/>
        <input
        type="text"
        required={true}
        value={state}
        onChange={(e)=> setState(e.target.value)}
        />
        <br/>
        <label>ZipCode</label>
        <br/>
        <input
        type="Number"
        minLength={5}
        maxLength={5}
        required={true}
        value={zipCode}
        onChange={(e)=> setZipCode(e.target.value)}
        />
        <br/>
        <br/>
    <button>Checkout</button>
      </form>
      </div>
  )
}
