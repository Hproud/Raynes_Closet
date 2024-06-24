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
  // const [size, setSize] = useState("Select Size");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Select Type");
  const [quantity, setQuantity] = useState(0);
  const [preview, setPreview] = useState("");
  const [youthSmall,setYouthSmall] = useState(false)
  const [youthMedium,setYouthMedium] = useState(false)
  const [youthLarge,setYouthLarge] = useState(false)
  const [small,setSmall] = useState(false)
  const [medium,setMedium] = useState(false)
  const [large,setLarge] = useState(false)
  const [xlarge, setXLarge] = useState(false)
  const [xxLarge,setXXLarge] = useState(false);

//& need to find way to redirect to product page now that there are multiples!!!


  const [YSquant,setYSquant] = useState(0)
  const [YMquant,setYMquant] = useState(0)
  const [YLquant,setYLquant] = useState(0)
  const [Squant,setSquant] = useState(0)
  const [Mquant,setMquant] = useState(0)
  const [Lquant,setLquant] = useState(0)
  const [XLquant,setXLquant] = useState(0)
  const [XXLquant,setXXLquant] = useState(0)


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

  // const proposed = {
  //   name,
  //   description,
  //   size,
  //   price,
  //   type,
  //   quantity,
  //   preview,
  //   pictures
  // };

console.log('youth Small:',youthSmall, 'quant:',YSquant )
console.log('youth Medium:',youthMedium, 'quant:',YMquant)
console.log('youth Large:',youthLarge, 'quant:',YLquant)
console.log('Small:',small, 'quant:',Squant)
console.log('Medium:',medium, 'quant:',Mquant)
console.log('Large:',large, 'quant:',Lquant)
console.log('XLarge:',xlarge, 'quant:',XLquant)
console.log('XXLarge:',xxLarge, 'quant:',XXLquant)

  const handleSubmit = (e) => {
    e.preventDefault();

if(!(Object.values(errors).length)){

  // dispatch(addNewItem(proposed))
  // .then((res)=>{dispatch(addPreviewPic(res,preview))})
  if(youthSmall){

    const proposed = {
      name,
      description,
      size: 'YS',
      price,
      type,
      quantity: YSquant,
      preview,
      pictures
    };
    dispatch(addNewItem(proposed))
  };


  if(youthMedium){

    const proposed = {
      name,
      description,
      size: 'YM',
      price,
      type,
      quantity: YMquant,
      preview,
      pictures
    };

    dispatch(addNewItem(proposed))
  }




  if(youthLarge){

    const proposed = {
      name,
      description,
      size: 'YL',
      price,
      type,
      quantity: YLquant,
      preview,
      pictures
    };

    dispatch(addNewItem(proposed))
  };



  if(small){

    const proposed = {
      name,
      description,
      size: 'S',
      price,
      type,
      quantity: Squant,
      preview,
      pictures
    };
    dispatch(addNewItem(proposed))
  }


  if(medium){

    const proposed = {
      name,
      description,
      size: 'M',
      price,
      type,
      quantity: Mquant,
      preview,
      pictures
    };
    dispatch(addNewItem(proposed))
  }



  if(large){

    const proposed = {
      name,
      description,
      size: 'L',
      price,
      type,
      quantity: Lquant,
      preview,
      pictures
    };
    dispatch(addNewItem(proposed))
  }



  if(xlarge){

    const proposed = {
      name,
      description,
      size: 'XL',
      price,
      type,
      quantity: XLquant,
      preview,
      pictures
    };
    dispatch(addNewItem(proposed))
  }


  if(xxLarge){

    const proposed = {
      name,
      description,
      size: 'XXL',
      price,
      type,
      quantity: XXLquant,
      preview,
      pictures
    };
    dispatch(addNewItem(proposed))
  }





  // .catch(async (res) => {
  //   const data = await res.json()

    setErrors(data)
  // }
// );
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
        <label style={{fontWeight:'bold'}}>Size and Available Amount:</label>

        {/* <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          style={{backgroundColor:'sandybrown',position:'relative', fontWeight:'bold', left:'20px'}}
          required={true}
        >
          <option style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          >Select Size</option>
          <option  ></option>
          <option  >YM</option>
          <option  >YL</option>
          <option  >S</option>
          <option  >M</option>
          <option  >L</option>
          <option  >XL</option>
          <option  >XXL</option>
          <option  >3X</option>
        </select> */}
        <br />
        <input type="checkbox" value={youthSmall} onChange={(e)=> setYouthSmall(!youthSmall)}/>YS <input value={YSquant} onChange={(e) => setYSquant(e.target.value)} className="avail"></input>
        <br />

        <input type="checkbox" value={youthMedium} onChange={(e)=> setYouthMedium(!youthMedium)} />YM <input value={YMquant} onChange={(e) => setYMquant(e.target.value)} className="avail"></input>
        <br />
        <input type="checkbox" value={youthLarge} onChange={(e)=> setYouthLarge(!youthLarge)} />YL <input value={YLquant} onChange={(e) => setYLquant(e.target.value)} className="avail"></input>
        <br />
        <input type="checkbox" value={small} onChange={(e)=> setSmall(!small)}/>S <input value={Squant} onChange={(e) => setSquant(e.target.value)} className="avail"></input>
        <br />
        <input type="checkbox" value={medium} onChange={(e)=> setMedium(!medium)} />M <input value={Mquant} onChange={(e) => setMquant(e.target.value)} className="avail"></input>
        <br/>
        <input type="checkbox" value={large} onChange={(e)=> setLarge(!large)} />L <input value={Lquant} onChange={(e) => setLquant(e.target.value)} className="avail"></input>
        <br />
        <input type="checkbox" value={xlarge} onChange={(e)=> setXLarge(!xlarge)} />XL <input value={XLquant} onChange={(e) => setXLquant(e.target.value)} className="avail"></input>
        <br />
        <input type="checkbox" value={xxLarge} onChange={(e)=> setXXLarge(!xxLarge)} />XS <input value={XXLquant} onChange={(e) => setXXLquant(e.target.value)} className="avail"></input>



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
        {/* <label style={{fontWeight:'bold'}}>Available Quantity</label>
        <br />
        <input
        style={{backgroundColor:'sandybrown', fontWeight:'bold'}}
          type='number'
          min={1}
          value={quantity}
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        /> */}
        {/* <br /> */}
        {/* <br /> */}
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
