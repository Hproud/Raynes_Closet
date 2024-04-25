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

const url = useSelector(state => state.products?.product?.images?.url)

// console.log(url,'this is the url')


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
    <div style={{display:'flex',flexDirection:'column'}}>
      <h1 >
        EditProduct
        </h1>
      <form onSubmit={handleSubmit}>
        <h3>Name: {product?.name}</h3>
        <br/>
      <div>
        {url && (

          <img style={{height:'200px',width:'200px'}} src={url}/>
        )}
      </div>
        <br/>
      <label style={{fontWeight:'bold', position:'relative',left:'40px'}}>Description :</label>
        <br />
        <textarea
          type='textbox'
          placeholder={product?.description}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required={true}
        />

        <h3 style={{position:'relative',left:'48px'}} >Size:</h3>
        <p style={{fontWeight:'bold',position:'relative',left:'60px',bottom:'20px',fontSize:'20pt'}}>{product?.size}</p>
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
        <label style={{fontWeight:'bold',position:'relative',left:'60px'}}>Price :</label>
        <br />
        <input
          type='number'
          min={0}
          value={price}
          placeholder={product?.price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required={true}
        />
        <br />
        <br />
<h3 style={{position:'relative',left:'20px'}}>Type: {product?.type}</h3>

<button type="submit" style={{height:'50px',width:'150px',borderRadius: '40px', backgroundColor:'rgb(44, 31, 4)',fontWeight:'bold',fontSize:'20pt',color:'white'}}>Update</button>
      </form>



        </div>
  )
}
