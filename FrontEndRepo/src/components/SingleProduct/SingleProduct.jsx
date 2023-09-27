import "./SingleProduct.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addToCart } from "../../API";

export default function SingleProduct({
  products,
  setAddedItemCart,
  myProducts,
  setMyproducts,
}) {
  const [cartQuantity, setCartQuantity] = useState(1);

  let { id } = useParams();
  let selectedProduct = products.find((e) => {
    if (e.id == id) {
      return e;
    }
  });

  async function submit(event) {
    event.preventDefault();

    try {
      let data = await addToCart(
        localStorage.getItem("userId"),
        selectedProduct.id,
        cartQuantity
      );
      setAddedItemCart(data);
      console.log(data)
      if(data){
        const myProductsCopy = [...myProducts]
        myProductsCopy.push(data)
        setMyproducts(myProductsCopy)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="single-product-header">{selectedProduct.name}</h1>
      <div className="image-container">
        <img
          className="single-product-image"
          src={`${selectedProduct.image_url}`}
          alt={`Image of ${selectedProduct.name}`}
        />
      </div>
      <h2 className="single-product-price">${selectedProduct.price}</h2>
      <form onSubmit={submit}>
        <label className='cart-quantity' htmlFor="cart-amount">Quantity:</label>
        <input
          name="cart-amount"
          type="number"
          value={cartQuantity}
          onChange={(event) => {
            setCartQuantity(event.target.value);
          }}
        />
        <button className="add-cart-button">Add to Cart</button>
      </form>
      <Link to={`/product/update/${selectedProduct.id}`}>
        <button>Update</button>
      </Link>
    </>
  );
}
