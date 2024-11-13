import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewItem } from "../../store/products";


export default function AddInventory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("Select Type");
  const [preview, setPreview] = useState("");
  const [youthSmall, setYouthSmall] = useState(false);
  const [youthMedium, setYouthMedium] = useState(false);
  const [youthLarge, setYouthLarge] = useState(false);
  const [small, setSmall] = useState(false);
  const [medium, setMedium] = useState(false);
  const [large, setLarge] = useState(false);
  const [xlarge, setXLarge] = useState(false);
  const [xxLarge, setXXLarge] = useState(false);

  const [YSquant, setYSquant] = useState(0);
  const [YMquant, setYMquant] = useState(0);
  const [YLquant, setYLquant] = useState(0);
  const [Squant, setSquant] = useState(0);
  const [Mquant, setMquant] = useState(0);
  const [Lquant, setLquant] = useState(0);
  const [XLquant, setXLquant] = useState(0);
  const [XXLquant, setXXLquant] = useState(0);

  const [errors, setErrors] = useState({});

  const pictures = [];

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

  // console.log("url", preview, "youth Small:", youthSmall, "quant:", YSquant);
  // console.log("youth Medium:", youthMedium, "quant:", YMquant);
  // console.log("youth Large:", youthLarge, "quant:", YLquant);
  // console.log("Small:", small, "quant:", Squant);
  // console.log("Medium:", medium, "quant:", Mquant);
  // console.log("Large:", large, "quant:", Lquant);
  // console.log("XLarge:", xlarge, "quant:", XLquant);
  // console.log("XXLarge:", xxLarge, "quant:", XXLquant);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!Object.values(errors).length) {

      if (youthSmall) {
        const proposed = {
          name,
          description,
          size: "YS",
          price,
          type,
          quantity: YSquant,
          preview,
          pictures,
        };
        dispatch(addNewItem(proposed));
      }

      if (youthMedium) {
        const proposed = {
          name,
          description,
          size: "YM",
          price,
          type,
          quantity: YMquant,
          preview,
          pictures,
        };

        dispatch(addNewItem(proposed))
        .catch((res)=>{
          const data = res.json()
          setErrors(data)
        })
      }

      if (youthLarge) {
        const proposed = {
          name,
          description,
          size: "YL",
          price,
          type,
          quantity: YLquant,
          preview,
          pictures,
        };

        dispatch(addNewItem(proposed))
        .catch((res)=>{
          const data = res.json()
          setErrors(data)
        })
      }

      if (small) {
        const proposed = {
          name,
          description,
          size: "S",
          price,
          type,
          quantity: Squant,
          preview,
          pictures,
        };
        dispatch(addNewItem(proposed))
        .catch((res)=>{
          const data = res.json()
          setErrors(data)
        })
      }

      if (medium) {
        const proposed = {
          name,
          description,
          size: "M",
          price,
          type,
          quantity: Mquant,
          preview,
          pictures,
        };
        dispatch(addNewItem(proposed))
        .catch((res)=>{
          const data = res.json()
          setErrors(data)
        })
      }

      if (large) {
        const proposed = {
          name,
          description,
          size: "L",
          price,
          type,
          quantity: Lquant,
          preview,
          pictures,
        };
        dispatch(addNewItem(proposed))
        .catch((res)=>{
          const data = res.json()
          setErrors(data)
        })
      }


      if (xlarge) {
        const proposed = {
          name,
          description,
          size: "XL",
          price,
          type,
          quantity: XLquant,
          preview,
          pictures,
        };
        dispatch(addNewItem(proposed))
        .catch((res)=>{
          const data = res.json()
          setErrors(data)
        })
      }

      if (xxLarge) {
        const proposed = {
          name,
          description,
          size: "XXL",
          price,
          type,
          quantity: XXLquant,
          preview,
          pictures,
        };
        dispatch(addNewItem(proposed))
        .catch((res)=>{
          const data = res.json()
          setErrors(data)
        })
      }





      setName("");
      setDescription("");
      setPrice(0);
      setType("Select Type");
      setPreview("");
      setYouthSmall(false);
      setYouthMedium(false);
      setYouthLarge(false);
      setSmall(false);
      setMedium(false);
      setLarge(false);
      setXLarge(false);
      setXXLarge(false);

      setYSquant(0);
      setYMquant(0);
      setYLquant(0);
      setSquant(0);
      setMquant(0);
      setLquant(0);
      setXLquant(0);
      setXXLquant(0);

      navigate('/')
    } else {
      setErrors(errors);
      return errors;
    }
  };


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        left: "280px",
        width: "250px",
      }}
    >


      <h1>Add A Product</h1>
      <form onSubmit={handleSubmit} style={{ width: "200px" }}>
        {errors && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {errors.errors?.name}
          </p>
        )}


        <label
          style={{ fontWeight: "bold", position: "relative", left: "70px" }}
        >
          Name :
        </label>
        <br />
        <input
          style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Give the Product a Name"
          required={true}
        />
        <br />
        <br />


        {errors && (
          <p style={{ color: "red", fontWeight: "bold" }}>
            {errors.errors?.description}
          </p>
        )}


        <label
          style={{ fontWeight: "bold", position: "relative", left: "50px" }}
        >
          Description :
        </label>
        <br />
        <textarea
          type="textbox"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Please enter a description of this item"
          style={{
            backgroundColor: "sandybrown",
            minHeight: "100px",
            minWidth: "180px",
            fontWeight: "bold",
          }}
          required={true}
        />


        <br />
        <br />


        {errors && (
          <p
            className="addProdErrors"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.size}
          </p>
        )}


        <label style={{ fontWeight: "bold" }}>Size and Available Amount:</label>

        <br />
        <input
          type="checkbox"
          value={youthSmall}
          onChange={() => setYouthSmall(!youthSmall)}
        />
        YS{" "}

        <input
          value={YSquant}
          onChange={(e) => setYSquant(e.target.value)}
          className="avail"
        ></input>
        <br />

        <input
          type="checkbox"
          value={youthMedium}
          onChange={() => setYouthMedium(!youthMedium)}
        />
        YM{" "}

        <input
          value={YMquant}
          onChange={(e) => setYMquant(e.target.value)}
          className="avail"
        ></input>

        <br />

       <input
          type="checkbox"
          value={youthLarge}
          onChange={() => setYouthLarge(!youthLarge)}
        />
        YL{" "}

        <input
          value={YLquant}
          onChange={(e) => setYLquant(e.target.value)}
          className="avail"
        ></input>
        <br />

        <input
          type="checkbox"
          value={small}
          onChange={() => setSmall(!small)}
        />
        S{" "}

        <input
          value={Squant}
          onChange={(e) => setSquant(e.target.value)}
          className="avail"
        ></input>
        <br />

        <input
          type="checkbox"
          value={medium}
          onChange={() => setMedium(!medium)}
        />
        M{" "}

        <input
          value={Mquant}
          onChange={(e) => setMquant(e.target.value)}
          className="avail"
        ></input>
        <br />

        <input
          type="checkbox"
          value={large}
          onChange={() => setLarge(!large)}
        />
        L{" "}

        <input
          value={Lquant}
          onChange={(e) => setLquant(e.target.value)}
          className="avail"
        ></input>
        <br />

        <input
          type="checkbox"
          value={xlarge}
          onChange={() => setXLarge(!xlarge)}
        />
        XL{" "}

        <input
          value={XLquant}
          onChange={(e) => setXLquant(e.target.value)}
          className="avail"
        ></input>
        <br />

        <input
          type="checkbox"
          value={xxLarge}
          onChange={() => setXXLarge(!xxLarge)}
        />
        XS{" "}

        <input
          value={XXLquant}
          onChange={(e) => setXXLquant(e.target.value)}
          className="avail"
        ></input>
        <br />

        {errors && (
          <p
            className="addProdErrors"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.price}
          </p>
        )}


        <label style={{ fontWeight: "bold" }}>Price :</label>
        <br />

        <input
          style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          type="number"
          value={price}
          placeholder={0}
          onChange={(e) => setPrice(e.target.value)}
          required={true}
        />
        <br />
        <br />

        {errors && (
          <p
            className="addProdErrors"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.type}
          </p>
        )}


        <label style={{ fontWeight: "bold" }}>Type :</label>

        <select
          onChange={(e) => {
            setType(e.target.value);
          }}
          style={{
            backgroundColor: "sandybrown",
            fontWeight: "bold",
            position: "relative",
            left: "20px",
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
            className="addProdErrors"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.quantity}
          </p>
        )}

        {errors && (
          <p
            className="addProdErrors"
            style={{ color: "red", fontWeight: "bold" }}
          >
            {errors.errors?.url}
          </p>
        )}


        <label style={{ fontWeight: "bold" }}>Primary Photo:</label>
        <br />

        <input
          style={{ backgroundColor: "sandybrown", fontWeight: "bold" }}
          type="text"
          // required={true}
          placeholder="Photo URL"
          value={preview}
          onChange={(e) => {
            setErrors({});
            setPreview(e.target.value);
          }}
          required={true}
        />
        <br />

        <br />
        <br />


        <button type="submit" className="addbutton">
          Add Product
        </button>{" "}


        <button className="cnclbutton" onClick={() => navigate("/")}>
          Cancel
        </button>
        <br />
      </form>
    </div>
  );
}
