import {  useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewItem } from "../../store/products";
// import * as productActions from "../../store/products";



export default function AddInventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("Select Size");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Select Type");
  const [quantity, setQuantity] = useState(0);
  const [preview, setPreview] = useState("");
  // const [pic1, setPic1] = useState("");
  // const [pic2, setPic2] = useState("");
  // const [pic3, setPic3] = useState("");
  // const [pic4, setPic4] = useState("");
  const [errors, setErrors] = useState({});

const pictures =[]

// if(pic1){
//   pictures.push(pic1)
// }
// if(pic2){
//   pictures.push(pic2)
// }
// if(pic3){
//   pictures.push(pic3)
// }

// if(pic4){
//   pictures.push(pic4)
// }

  const proposed = {
    name,
    description,
    size,
    price,
    type,
    quantity,
    preview,
    pictures
  };

// console.log(pics)

  const handleSubmit = (e) => {
    e.preventDefault();

if(!(Object.values(errors).length)){

  dispatch(addNewItem(proposed))
  // .then((res)=>{dispatch(addPreviewPic(res,preview))})
  .then((res) => navigate(`/products/${res}`))
  .catch(async (res) => {
    const data = await res.json()
    // console.log(data, "this is the error we got");
    setErrors(data)
  });
  setName("");
  setDescription("");
  setSize("Select Size");
  setPrice(0);
  setQuantity(0);
  setPreview("");
  // setPic1();
  // setPic2();
  // setPic3();
  // setPic4();
}else{
  setErrors(errors)
  return errors
}
}

  // console.log(proposed);

  // useEffect(() => {
  //   const err = {};

  //   if (size === "Select Size") {
  //     err.size = "You Must Select a size for this product.";
  //   }

  //   if (type === "Select Type") {
  //     err.type = "You must select a type for this product";
  //   }

  //   setErrors(err);
  // }, [size, type]);
// console.log(errors,'errors')
  return (
    <div style={{display:'flex',flexDirection:'column',position:'relative'
    , left:'280px', width:'250px'}}>
      <h1>Add A Product</h1>
      <form onSubmit={handleSubmit} style={{width:'200px'}}>
  {errors && (
    <p
    style={{ color: "red", fontWeight: "bold" }} >{errors.errors?.name}</p>
  )}
        <label style={{fontWeight:'bold',position:'relative',left:'70px'}}>Name :</label>
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Give the Product a Name"
          required={true}
        />
        <br />
        <br />
        {errors && (
    <p
    style={{ color: "red", fontWeight: "bold" }} >{errors.errors?.description}</p>
  )}
        <label style={{fontWeight:'bold',position:'relative', left:'50px'}}>Description :</label>
        <br />
        <textarea
          type='textbox'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please enter a description of this item"
          style={{backgroundColor:'sandybrown',minHeight:'100px',minWidth:'180px', fontWeight:'bold'}}
          required={true}
        />
        <br />
        <br />
        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.size}
          </p>
        )}
        <label style={{fontWeight:'bold'}}>Size :</label>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{backgroundColor:'sandybrown',position:'relative', fontWeight:'bold', left:'20px'}}
          required={true}
        >
          <option style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          >Select Size</option>
          <option  >YS</option>
          <option  >YM</option>
          <option  >YL</option>
          <option  >S</option>
          <option  >M</option>
          <option  >L</option>
          <option  >XL</option>
          <option  >XXL</option>
          <option  >3X</option>
        </select>
        <br />
        <br />
        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.price}
          </p>
        )}
        <label style={{fontWeight:'bold'}}>Price :</label>
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='number'
          value={price}
          placeholder={0}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          required={true}
        />
        <br />
        <br />
        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.type}
          </p>
        )}
        <label style={{fontWeight:'bold'}}>Type :</label>

        <select
          onChange={(e) => {
            setType(e.target.value);
          }}
          style={{backgroundColor:'sandybrown', fontWeight:'bold',
        position:'relative',
        left:'20px'
        }}
          required={true}
        >
          <option>Select Type</option>
          <option>hoodie</option>
          <option>tanktop</option>
          <option>t-shirt</option>
        </select>
        <br />
        <br />
        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.quantity}
          </p>
        )}
        <label style={{fontWeight:'bold'}}>Available Quantity</label>
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='number'
          min={1}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        />
        <br />
        <br />
        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.url}
          </p>
        )}

        <label style={{fontWeight:'bold'}}>Primary Photo:</label>
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='text'
          // required={true}
placeholder="Photo URL"
          value={preview}
          onChange={(e) => {
           setErrors({}); setPreview(e.target.value);
          }}
          required={true}
        />
        <br />
        {/* <hr />
        <label style={{fontWeight:'bold'}}>Additional Photos: (OPTIONAL)</label>
        <br />
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='text'
          placeholder="Photo URL"

          value={pic1}
          onChange={(e) => setPic1(e.target.value)}
        />
        <br />
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='text'

          value={pic2}
          onChange={(e) => setPic2(e.target.value)}
placeholder="Photo URL"

        />
        <br />
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='text'
          value={pic3}
          onChange={(e) => setPic3(e.target.value)}
placeholder="Photo URL"

        />
        <br />
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='text'
          value={pic4}
          onChange={(e) => setPic4(e.target.value)}
placeholder="Photo URL"

        /> */}
        <br />
        <br />
        <button type='submit' className="addbutton">Add Product</button> <button className="cnclbutton" onClick={()=> navigate('/')}>Cancel</button>
        <br />
      </form>
    </div>
  );
}
