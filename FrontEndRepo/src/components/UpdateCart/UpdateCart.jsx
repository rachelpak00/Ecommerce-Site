import { updateCart } from "../../API";
import { useParams, useNavigate } from "react-router-dom";
// import "./UpdateCart.css";

export default function UpdateCart({
  products,
  selectedId,
  quantity,
  setQuantity,
  myProducts,
  setMyproducts
}) {
  const navigate = useNavigate()
  let { id } = useParams();
  let selectedProduct = products.find((e) => {
    if (e.id == id) {
      return e;
    }
  });

  async function updateItem() {
    try {

      console.log(quantity)
      let data = await updateCart(localStorage.getItem("userId"), id, quantity);
      console.log(data)
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {selectedProduct ? (
        <>
          <h1>{selectedProduct.name}</h1>
          <img
            src={`${selectedProduct.image_url}`}
            alt={`Image of ${selectedProduct.name}`}
          />
          <h2>${selectedProduct.price}</h2>
          <form onSubmit={updateItem}>
            <label htmlFor="cart-amount">Quantity</label>
            <input
              name="cart-amount"
              type="number"
              value={quantity}
              onChange={(event) => {
                setQuantity(event.target.value);
              }}
            />
            <button type="submit">Update</button>
          </form>
        </>
      ) : (
        <h2>Error Loading Product, Please Refresh</h2>
      )}
    </>
  );
}
