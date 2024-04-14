import {  useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { editTheProuct, findOneProduct } from "../../store/products";



export default function EditProduct() {
  const {itemId} = useParams()
const product = useSelector(state => state.products?.product)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
const [errors,setErrors] = useState({})

useEffect(()=>{
  dispatch(findOneProduct(itemId))
},[dispatch,itemId])

const handleSubmit = (e) =>{
  e.preventDefault();
  dispatch(editTheProuct(product.id,{description: description, price: price}))
  .then(()=> navigate(`/products/${product.id}`)).catch(async (res) =>{
    const error = await res.json()
    if (error){
      setErrors(error)
    }
  })
return
}

  return (
    <div>
      <div>
        {/* <img src={product.preview}/> */}
      </div>
      <h1>
        EditProduct
        </h1>
      <form onSubmit={handleSubmit}>
        <h3>Name: {product.name}</h3>
      <label>Description :</label>
        <br />
        <textarea
          type='textbox'
          placeholder={product.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />

        <h3>Size: {product.size}</h3>

        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.size}
          </p>
        )}

        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.price}
          </p>
        )}
        <label>Price :</label>
        <br />
        <input
          type='number'
          min={0}
          value={price}
          placeholder={product.price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required={true}
        />
        <br />
        <br />
<h3>Type: {product.type}</h3>

<button type="submit">Update</button>
      </form>



        </div>
  )
}
