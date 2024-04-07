import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../../store/products";
import { useSelector } from "react-redux";

import "./Landing.css";

export default function LandingPage() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state) => state.products?.products);

  useEffect(() => {
    dispatch(getAllProducts()).then(() => setIsLoading(false));
  }, [dispatch]);
  if (!isLoading) {
    return (
      <div>
        <ul className='productlist'>
          {products &&
            products.map((item) => (
              <li key={item.id} className='item'>
                <div>
                  <img className='itempic' src={item.preview} />
                  <p>{item.name}</p>
                  <p>{item.description}</p>
                  <p>$ {item.price.toFixed(2)}</p>
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
