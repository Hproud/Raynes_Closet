// import { useNavigate } from "react-router-dom"


export default function Cart({cartItems}) {
// const navigate = useNavigate();




  return (
    <div>
      <h2>Cart</h2>
      <ul>

{cartItems && cartItems.map((item)=>(

<li key={item.id}>
  <img src={item.prodInfo?.Images[0].url} style={{height:'50px',width:'50px'}}/>
  <p>{item.prodInfo?.name}</p>
  <p>{item.prodInfo?.size}</p>
  <p>{item?.quantity}</p>
  <p>$ {(item?.quantity * item.prodInfo?.price).toFixed(2)}</p>
  <hr />
</li>
))}
</ul>

    </div>
  )
}