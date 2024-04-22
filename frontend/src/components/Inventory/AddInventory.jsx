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
  const [pic1, setPic1] = useState("");
  const [pic2, setPic2] = useState("");
  const [pic3, setPic3] = useState("");
  const [pic4, setPic4] = useState("");
  const [errors, setErrors] = useState({});

const pictures =[]

if(pic1){
  pictures.push(pic1)
}
if(pic2){
  pictures.push(pic2)
}
if(pic3){
  pictures.push(pic3)
}

if(pic4){
  pictures.push(pic4)
}

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

    if (size === "Select Size") {
          setErrors({size : "You Must Select a size for this product."});
        }

        if (type === "Select Type") {
          setErrors({type : "You must select a type for this product"});
        }

    dispatch(addNewItem(proposed))
    // .then((res)=>{dispatch(addPreviewPic(res,preview))})
      .then((res) => navigate(`/products/${res}`))
      .catch(async (res) => {
        const data = await res.json()
        console.log(data, "this is the error we got");
       setErrors(data)
      });
    setName("");
    setDescription("");
    setSize("Select Size");
    setPrice(0);
    setQuantity(0);
    setPreview("");
    setPic1();
    setPic2();
    setPic3();
    setPic4();
  };

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

  return (
    <div style={{display:'flex',flexDirection:'column',position:'relative'
    , left:'280px'}}>
      <h1>Add A Product</h1>
      <form onSubmit={handleSubmit}>
        {errors && (
          <p
          style={{ color: "red", fontWeight: "bold" }} >{errors.message}</p>
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
            {errors.size}
          </p>
        )}
        <label style={{fontWeight:'bold'}}>Size :</label>

        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{backgroundColor:'sandybrown',position:'relative', fontWeight:'bold', left:'20px'}}
          required={true}
        >
          <option style={{backgroundColor:'sandybrown', fontWeight:'bold'}}>Select Size</option>
          <option value={"YS"}>YS</option>
          <option value={"YM"}>YM</option>
          <option value={"YL"}>YL</option>
          <option value={"S"}>S</option>
          <option value={"M"}>M</option>
          <option value={"L"}>L</option>
          <option value={"XL"}>XL</option>
          <option value={"XXL"}>XXL</option>
          <option value={"XXL"}>3X</option>
        </select>
        <br />
        <br />
        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.price}
          </p>
        )}
        <label style={{fontWeight:'bold'}}>Price :</label>
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='number'
          min={0}
          placeholder={0}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required={true}
        />
        <br />
        <br />
        {errors && (
          <p
            className='addProdErrors'
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.type}
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
            {errors.quantity}
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
            {errors.preview}
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
            setPreview(e.target.value);
          }}
        />
        <br />
        <hr />
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

        />
        <br />
        <br />
        <button type='submit' className="addbutton">Add Prouduct</button> <button className="cnclbutton" onClick={()=> navigate('/')}>Cancel</button>
        <br />
      </form>
    </div>
  );
}
