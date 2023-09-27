import './UpdateProduct.css'
import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { updateProduct } from "../../API";

export default function UpdateProduct({ products, setProducts }) {
  let { id } = useParams()
  let selectedProduct = products.find((e) => {
      if(e.id == id){
          return e
      }
  })
  console.log(selectedProduct)

  const [name, setName] = useState(selectedProduct.name);
  const [description, setDescription] = useState(selectedProduct.description);
  const [gender, setGender] = useState(selectedProduct.gender);
  const [category, setCategory] = useState(selectedProduct.category);
  const [price, setPrice] = useState(selectedProduct.price);
  const [quantity, setQuantity] = useState(selectedProduct.quantity);
  const [brand, setBrand] = useState(selectedProduct.brand);
  const [sku, setSku] = useState(selectedProduct.sku);
  const [image_url, setImage_url] = useState(selectedProduct.image_url);
  const [weight, setWeight] = useState(selectedProduct.weight);
  const [dimensions, setDimensions] = useState({});

  

  async function submit(event) {
    event.preventDefault();

    try {
      let data = await updateProduct(
        selectedProduct.id,
        name,
        description,
        gender,
        category,
        price,
        quantity,
        brand,
        sku,
        image_url,
        weight,
        // dimensions
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <form onSubmit={submit}>
        <label htmlFor="name">Name: </label>
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
        <label htmlFor="price">Price: $</label>
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
            setBrand(event.target.value)
         }} />
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

        <button type="submit">Update</button>
      </form>
    </>
  );
}