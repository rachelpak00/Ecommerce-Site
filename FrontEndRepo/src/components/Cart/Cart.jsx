import "./Cart.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  fetchProductById,
  deleteCartItem,
  updateCart,
} from "../../API";

export default function Cart({
  products,
  setProducts,
  total,
  setTotal,
  myProducts,
  setMyproducts,
  addedItemCart,
  myCart,
  setSelectedId,
}) {
  
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState(undefined)

  useEffect(()=>{
    async function getProducts(){
      if(myCart != 'User cart is empty' && myCart != []){
        const productIds = myCart.map((item) => item.product_id);

        const productsList = [];
        for (const productId of productIds) {
          const product = await fetchProductById(productId);
          productsList.push(product);
        }

        setMyproducts(productsList);

        const productPrices = productsList.map((product) => product.price);
        let total = 0.0;

        myCart.map((cartItem, idx) => {
          total += Number(cartItem.quantity * productPrices[idx])
        })

        setTotal(Math.round(total * 100) / 100);
      }
    }
    getProducts()
  },[myCart, deletedItemId])

  async function deleteItem() {
    try {
      let data = await deleteCartItem(
        localStorage.getItem("userId"),
        deletedItemId
      );
      if(data){
        const myProductsCopy = myProducts.filter((product) => {
          console.log(deletedItemId)
          return product.id !== deletedItemId
        })
        setMyproducts(myProductsCopy)
      }
    } catch (error) {
      console.log(error);
    }
  }

  

  return (
    <>
      <h1 className="cart-header">My Cart</h1>
      <div className="cart-container">
        {console.log(myCart, myProducts)}
        {myCart != "User cart is empty" && myCart != [] && myProducts != [] ? (
          <>
            <ul>
              {myProducts.map((e, idx) => {
                return (
                  <li key={e.id} className="individual-cart-item">
                    <h2 className="cart-item-name">{e.name}</h2>
                    <h3 className="item-info">Quantity: {myCart[idx].quantity}</h3>
                    <h3 className="item-info">${e.price}(ea)</h3>
                    <Link to={`/products/cart/update/${e.id}`}><button className="cart-button">
                      Update</button></Link>
                    <button className="cart-button"
                      onClick={() => {
                        setDeletedItemId(e.id);
                        setConfirmDelete(true);
                      }}
                    >
                      Remove
                    </button>
                    {confirmDelete ? (
                      <button className="cart-button"
                        onClick={() => {
                          deleteItem();
                          setConfirmDelete(false);
                        }}
                      >
                        Confirm
                      </button>
                    ) : (
                      <></>
                    )}
                  </li>
                );
              })}
            </ul>
            <h2 className="cart-total">Total: ${total}</h2>

            <Link to="/checkout">
              <button className="checkout-button">Checkout</button>
            </Link>
          </>
        ) : (
          <h2>NO ITEMS IN CART</h2>
        )}
      </div>
    </>
  );
}
