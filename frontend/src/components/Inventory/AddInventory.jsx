import { useEffect, useState } from "react";

export default function AddInventory() {
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [size, setSize] = useState();
  const [price, setPrice] = useState(0.0);
  const [type, setType] = useState();
  const [quantity, setQuantity] = useState(0);
  const [preview, setPreview] = useState();
  const [pictures, setPictures] = useState([]);
  const [errors, setErrors] = useState({});


useEffect(()=>{
  const err = {}

  if(!name || name.length <1){
    err.name='Product Name is Required'
  };

  if(!description){
    err.description='Description is Requied.'
  }

  if(size === 'Select Size'){
    err.size= 'You Must Select a size for this product.'
  };

  if(price <= 0){
    err.price="Price must be more than 0."
  };

  if (type === "Select Type"){
    err.type="You must select a type for this product"
  };

  if (quantity <= 0){
    err.quantity = "You Must Have Stock available to create this product."
  }

  if(!preview){
    err.preview="You must Post at Least One Photo of the Product"
  };



  setErrors(err)
},[])





  return (
    <div>
      <form>
        <h1>Add A Product</h1>
        <br />
        <label>name :</label>
        <br />
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>description :</label>
        <br />
        <textarea
          type='textbox'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br />
        <label placeholder>size :</label>
        <br />
        <select value={size} onChange={(e) => setSize(e.target.value)}
        required={true}
       >
          <option>Select Size </option>
          <option>YS</option>
          <option>YM</option>
          <option>YL</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
          <option>XXL</option>
          <option>3X</option>
        </select>
        <br />
        <label>Price :</label>
        <br />
        <input type='number' min={0} />
        <br />
        <label>Type :</label>
        <br />
        <select>
          <option>Select Type</option>
          <option>hoodie</option>
          <option>tanktop</option>
          <option>t-shirt</option>
        </select>
        <br />
        <label>Available Quantity</label>
        <br />
        <input type='number' min={0} defaultValue={0} />
        <br />
        <label>Pictures:</label>
        <br />
        <input type='file' required={true} accept="image/jpeg, image/png"/>
        <br />
        <br />
        <input type='file' accept="image/jpeg, image/png" />
        <br />
        <br />
        <input type='file' accept="image/jpeg, image/png" />
        <br />
        <br />
        <input type='file' accept="image/jpeg, image/png" />
        <br />
        <br />
        <input type='file' accept="image/jpeg, image/png" />
        <br />
        <br />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}
