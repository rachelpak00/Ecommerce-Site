import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  fetchCart,
  fetchAllProducts,
  fetchUserDetails,
  fetchPaymentInfo,
  fetchOrders,
} from "./API";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import Mens from "./components/MensProducts/Mens";
import Womens from "./components/WomensProducts/Womens";
import Cart from "./components/Cart/Cart";
import UpdateCart from "./components/UpdateCart/UpdateCart";
import Checkout from "./components/Checkout/Checkout";
import PaymentSelection from "./components/Payment-Selection/PaymentSelection";
import OrderConfirmation from "./components/Order-Confirmation/OrderConfirmation";
import PaymentDetails from "./components/Payment-Details/PaymentDetails";
import AddPaymentDetails from "./components/AddPaymentDetails/AddPaymentDetails";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Create from "./components/Creating-Product/Create";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import SingleProduct from "./components/SingleProduct/SingleProduct";
import AddUserDetails from "./components/AddUserDetails/AddUserDetails";
import UpdateUserDetails from "./components/UpdateUserDetails/UpdateUserDetails";
import Profile from "./components/Profile/Profile";
import AdminDashboard from "./Admin Dashboard/src/App";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [myDetails, setMyDetails] = useState({});
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [myPayment, setMyPayment] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState({});
  const [total, setTotal] = useState(0.0);
  const [myProducts, setMyproducts] = useState([]);
  const [order, setOrder] = useState({});
  const [createdProduct, setCreatedProduct] = useState({});
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [womensFilteredProducts, setWomensFilteredProducts] = useState([]);
  const [createdPaymentInfo, setCreatedPaymentInfo] = useState([]);
  const [createdUserDetails, setCreateUserDetails] = useState({});
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [addedItemCart, setAddedItemCart] = useState({});
  const [selectedId, setSelectedId] = useState(undefined);
  const [quantity, setQuantity] = useState(0);
  const [myCart, setMyCart] = useState([]);

  const location = useLocation();
  const shouldRenderHeader = !location.pathname.startsWith("/admin-dashboard");

  useEffect(() => {
    async function getProducts() {
      try {
        let data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [createdProduct]);

  async function getUserDetails() {
    try {
      let data = await fetchUserDetails(localStorage.getItem("userId"));
      setMyDetails(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      getUserDetails();
    } else {
      setLoggedIn(false);
    }
  }, [createdUserDetails, loggedIn]);

  async function getOrders() {
    try {
      let data = await fetchOrders();
      setConfirmedOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getOrders();
    }
  }, [order, loggedIn]);

  async function getPaymentInfo() {
    try {
      let data = await fetchPaymentInfo(localStorage.getItem("userId"));
      setMyPayment(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getPaymentInfo();
    }
  }, [createdPaymentInfo, loggedIn]);

  useEffect(
    () => {
      async function getCart() {
        try {
          let data = await fetchCart(localStorage.getItem("userId"));
          if (myCart != "User cart is empty" && myCart != []) {
            setMyCart(data);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (localStorage.userId) {
        getCart();
      }
    },
    [addedItemCart],
    [loggedIn]
  );

  return (
    <>
      {shouldRenderHeader && (
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mens-products"
          element={
            <Mens
              products={products}
              setProducts={setProducts}
              filteredProducts={filteredProducts}
              setFilteredProducts={setFilteredProducts}
              displayedProducts={displayedProducts}
              setDisplayedProducts={setDisplayedProducts}
            />
          }
        />
        <Route
          path="/womens-products"
          element={
            <Womens
              products={products}
              setProducts={setProducts}
              womensFilteredProducts={womensFilteredProducts}
              setWomensFilteredProducts={setWomensFilteredProducts}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              products={products}
              setProducts={setProducts}
              total={total}
              setTotal={setTotal}
              myProducts={myProducts}
              setMyproducts={setMyproducts}
              addedItemCart={addedItemCart}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              quantity={quantity}
              setQuantity={setQuantity}
              myCart={myCart}
              setMyCart={setMyCart}
            />
          }
        />
        <Route
          path="/products/cart/update/:id"
          element={
            <UpdateCart
              products={products}
              setSelectedId={setSelectedId}
              selectedId={selectedId}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          }
        />
        <Route
          path="/login"
          element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/register"
          element={<Register loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/create-product"
          element={
            <Create
              loggedIn={loggedIn}
              createdProduct={createdProduct}
              setCreatedProduct={setCreatedProduct}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <SingleProduct
              products={products}
              setProducts={setProducts}
              setAddedItemCart={setAddedItemCart}
              myProducts={myProducts}
              setMyproducts={setMyproducts}
            />
          }
        />
        <Route
          path="/product/update/:id"
          element={
            <UpdateProduct
              products={products}
              setProducts={setProducts}
              myProducts={myProducts}
              setMyproducts={setMyproducts}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout myDetails={myDetails} setMyDetails={setMyDetails} />
          }
        />
        <Route
          path="/payment-selection"
          element={
            <PaymentSelection
              myPayment={myPayment}
              setMyPayment={setMyPayment}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              myDetails={myDetails}
              total={total}
              myProducts={myProducts}
              order={order}
              setOrder={setOrder}
            />
          }
        />
        <Route
          path="/order-confirmation"
          element={
            <OrderConfirmation
              selectedPayment={selectedPayment}
              myDetails={myDetails}
              total={total}
              myProducts={myProducts}
              setMyproducts={setMyproducts}
              order={order}
              setOrder={setOrder}
            />
          }
        />
        <Route
          path="/payment-details"
          element={
            <PaymentDetails
              myPayment={myPayment}
              setMyPayment={setMyPayment}
              createdPaymentInfo={createdPaymentInfo}
              setCreatedPaymentInfo={setCreatedPaymentInfo}
            />
          }
        />
        <Route
          path="/profile/add-payment-details"
          element={
            <AddPaymentDetails
              setCreatedPaymentInfo={setCreatedPaymentInfo}
              setMyPayment={setMyPayment}
              myPayment={myPayment}
            />
          }
        />
        <Route
          path="/profile/add-user-details"
          element={
            <AddUserDetails
              setMyDetails={setMyDetails}
              myDetails={myDetails}
              setCreateUserDetails={setCreateUserDetails}
            />
          }
        />
        <Route
          path="/profile/update-user-details"
          element={
            <UpdateUserDetails
              updatedDetails={updatedDetails}
              setUpdatedDetails={setUpdatedDetails}
              setMyDetails={setMyDetails}
              myDetails={myDetails}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              myDetails={myDetails}
              setMyDetails={setMyDetails}
              myPayment={myPayment}
              setMyPayment={setMyPayment}
              confirmedOrders={confirmedOrders}
              setConfirmedOrders={setConfirmedOrders}
              order={order}
            />
          }
        />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
