import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/products";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import "./Landing.css";
import { createCart, getCurrCart } from "../../store/cart";

export default function LandingPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state) => state.products?.products);
const navigate= useNavigate()
const cart = useSelector(state => state.cart?.cart)

useEffect(() => {
    dispatch(getAllProducts())
    .then(() => {setIsLoading(false)})
    // .catch(async (res) =>{
    //   const data = await res.json();
      // console.log(data)
      // console.log(data,'this is the error in landing')
    // })
    dispatch(getCurrCart()).catch(()=>{

      if(!cart){
        dispatch(createCart())
      }
    })
  }, [dispatch,cart?.id]);


  if (!isLoading) {
    return (
      <div>
        <ul className='productlist'>
          {products &&
            products.map((item) => (
              <li key={item.id} className='item' onClick={()=>{navigate(`/products/${item.id}`)}}>
                <div>
                  <img className='itempic' src={item.preview}  />
                  <p style={{fontWeight:'bold'}}>{item.name}</p>
                  <p style={{fontWeight:'bold'}}>{item.description}</p>
                  <p style={{fontWeight:'bold',fontSize:'16pt'}}>$ {item.price.toFixed(2)}</p>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  } else {
    return <div>Loading.....</div>;
  }
}
