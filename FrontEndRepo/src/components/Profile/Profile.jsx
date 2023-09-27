import "./Profile.css";
import { Link } from "react-router-dom";
import { useEffect } from 'react'

export default function Profile({
  myDetails,
  setMyDetails,
  myPayment,
  setMyPayment,
  confirmedOrders,
  setConfirmedOrders,
  order
}) {

  useEffect(() => {
    let myOrders = []
      confirmedOrders.map((e) => {
        if(e.user_id == localStorage.getItem('userId')){
          myOrders.push(e)
        }
        setConfirmedOrders(myOrders)
      })
  },[order])
  console.log(confirmedOrders)
  return (
    <>
      {!myDetails.error ? (
        <h1 className="welcoming-header">Welcome, {myDetails.first_name + " " + myDetails.last_name}</h1>
      ) : (
        <h1 className="welcoming-header">Welcome, User</h1>
      )}
      <div className="overall-details">
        <div className="user-details-container">
          <h2 className="details-header">My Details</h2>
          {!myDetails.error ? (
            <>
              <h3 className="details-info">
                First Name: {myDetails.first_name} Last Name:{" "}
                {myDetails.last_name}
              </h3>
              <h3 className="details-info">Address: {myDetails.address}</h3>
              <h3 className="details-info">
                City: {myDetails.city} State: {myDetails.state}
              </h3>
              <h3 className="details-info">
                Zip Code: {myDetails.postal_code} Country: {myDetails.country}
              </h3>
            </>
          ) : (
            <> 
              <h3 className="details-info">No Saved Info</h3>
              <Link to="/profile/add-user-details"><button className="profile-button">Add Details</button></Link>
            </>
          
          )}
        </div>

        <div className="user-payment-container">
          <h2 className="payment-header">My Saved Payment Details</h2>
          {myPayment && myPayment.length ? (
            <>
              {myPayment.map((e) => {
                return (
                  <div key={e.payment_id} className="individual-method">
                    <h3 className="payment-info">
                      Name: {e.cardholder_name} / Card Number:{" "}
                      {e.card_number}
                    </h3>
                  </div>
                );
              })}
              <Link to="/profile/add-payment-details">
                <button className="profile-button">Add Payment Method</button>
              </Link>
            </>
          ) : (
            <>
              <h3 className="payment-info">No Saved Payment Info</h3>
              <Link to="/profile/add-payment-details">
                <button className="profile-button">Add Payment Method</button>
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="user-orders-container">
        <h2 className="orders-header">My Orders</h2>
        <>
          {!confirmedOrders && !confirmedOrders.length ? (
            <h3 className="orders-info">You have no orders</h3>
          ) : (
            confirmedOrders.map((e) => {
              return (
                <div key={e.order_id} className="individual-order">
                  <h3 className="orders-info">Order Number: {e.order_id}</h3>
                  <h4 className="order-details">Status: {e.status}</h4>
                  <h4 className="order-details">Shipping to: {e.shipping_address}</h4>
                </div>
              );
            })
          )}
        </>
      </div>
    </>
  );
}
