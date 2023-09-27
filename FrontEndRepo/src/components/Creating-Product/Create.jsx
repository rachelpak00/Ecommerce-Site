import "./Create.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../../API";

export default function Create({
  loggedIn,
  createdProduct,
  setCreatedProduct,
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [gender, setGender] = useState(undefined);
  const [category, setCategory] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [brand, setBrand] = useState("");
  const [sku, setSku] = useState("");
  const [image_url, setImage_url] = useState("");
  const [weight, setWeight] = useState(0);
  const [dimensions, setDimensions] = useState({});

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      let data = await createProduct(
        name,
        description,
        gender,
        category,
        price,
        quantity,
        brand,
        sku,
        image_url,
        weight
        // dimensions
      );
      setCreatedProduct(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h3>Inputs labeled with '*' are required</h3>
      <form onSubmit={submit}>
        <label htmlFor="name">*Name: </label>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label htmlFor="description">Description: </label>
        <textarea
          rows={5}
          cols={50}
          name="description"
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <fieldset>
          <legend>*Gender</legend>
          <label htmlFor="male">Male</label>
          <input
            name="gender"
            id="male"
            type="radio"
            value={"Male"}
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
          <label htmlFor="female">Female</label>
          <input
            name="gender"
            id="female"
            type="radio"
            value={"Female"}
            onChange={(event) => {
              setGender(event.target.value);
            }}
          />
        </fieldset>
        <fieldset>
          <legend>Category</legend>
          <label htmlFor="top">Top</label>
          <input
            name="category"
            type="radio"
            id="top"
            value={"Top"}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
          <label htmlFor="bottom">Bottom</label>
          <input
            name="category"
            type="radio"
            id="bottom"
            value={"Bottom"}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
          <label htmlFor="shoe">Shoe</label>
          <input
            name="category"
            type="radio"
            id="shoe"
            value={"Shoe"}
            onChange={(event) => {
              setCategory(event.target.value);
            }}
          />
        </fieldset>
        <label htmlFor="price">*Price: $</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <label htmlFor="quantity">Quantity: </label>
        <input
          type="number"
          name="quantity"
          value={quantity}
          onChange={(event) => {
            setQuantity(event.target.value);
          }}
        />
        <label htmlFor="brand">Brand: </label>
        <input
          type="text"
          name="brand"
          value={brand}
          onChange={(event) => {
            setBrand(event.target.value);
          }}
        />
        <label htmlFor="sku">Sku: </label>
        <input
          type="text"
          name="sku"
          value={sku}
          onChange={(event) => {
            setSku(event.target.value);
          }}
        />
        <label htmlFor="Image-url">Image Url: </label>
        <input
          type="text"
          name="Image-url"
          value={image_url}
          onChange={(event) => {
            setImage_url(event.target.value);
          }}
        />
        <label htmlFor="weight">Weight: lbs </label>
        <input
          type="number"
          name="weight"
          value={weight}
          onChange={(event) => {
            setWeight(event.target.value);
          }}
        />

        <button type="submit">Create</button>
      </form>
    </>
  );
}
