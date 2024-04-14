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

  console.log(proposed);

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
    <div>
      <h1>Add A Product</h1>
      <form onSubmit={handleSubmit}>
        {errors && (
          <p
          style={{ color: "red", fontWeight: "bold" }} >{errors.message}</p>
        )}
        <br />
        <label>Name :</label>
        <br />
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required={true}
        />
        <br />
        <br />
        <label>Description :</label>
        <br />
        <textarea
          type='textbox'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
        <label>Size :</label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          required={true}
        >
          <option>Select Size</option>
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
        <label>Price :</label>
        <br />
        <input
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
        <label>Type :</label>
        <br />
        <select
          onChange={(e) => {
            setType(e.target.value);
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
        <label>Available Quantity</label>
        <br />
        <input
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
        <label>Primary Photo:</label>
        <br />
        <input
          type='text'
          // required={true}

          value={preview}
          onChange={(e) => {
            setPreview(e.target.value);
          }}
        />
        <br />
        <hr />
        <label>Additional Photos:</label>
        <br />
        <br />
        <input
          type='text'

          value={pic1}
          onChange={(e) => setPic1(e.target.value)}
        />
        <br />
        <br />
        <input
          type='text'

          value={pic2}
          onChange={(e) => setPic2(e.target.value)}
        />
        <br />
        <br />
        <input
          type='text'
          value={pic3}
          onChange={(e) => setPic3(e.target.value)}
        />
        <br />
        <br />
        <input
          type='text'
          value={pic4}
          onChange={(e) => setPic4(e.target.value)}
        />
        <br />
        <br />
        <button type='submit'>Add Prouduct</button> <button>Cancel</button>
        <br />
      </form>
    </div>
  );
}
