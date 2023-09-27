import { createOrder } from "../../API";
import "./PaymentSelection.css";
import { Link, useNavigate } from "react-router-dom";

export default function PaymentSelection({
  myPayment,
  setMyPayment,
  selectedPayment,
  setSelectedPayment,
  myDetails,
  total,
  myProducts,
  order,
  setOrder,
}) {
  const navigate = useNavigate();
  let shippingAddress = `${myDetails.address}, ${myDetails.city}, ${myDetails.state} ${myDetails.postal_code}`;

  async function orderConfirm(event) {
    event.preventDefault();
    try {
      let data = await createOrder(
        localStorage.getItem("userId"),
        total,
        shippingAddress,
        selectedPayment.billing_address,
        "pending",
        selectedPayment.payment_id,
        myProducts
      );
      setOrder(data);
      navigate("/order-confirmation");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="payment-selection-header">PLEASE SELECT A PAYMENT METHOD OR ADD A PAYMENT METHOD</h1>
      {myPayment != [] ? (
        <div className="payment-container">
          {myPayment.map((e) => {
            return (
              <div key={e.payment_id} className="individual-payment">
                <h3 className="user-payment-info">Card Holder Name: {e.cardholder_name}</h3>
                <h3 className="user-payment-info">Card Number: {e.card_number}</h3>
                <button className="payment-selection-button"
                  onClick={() => {
                    setSelectedPayment(e);
                  }}
                >
                  Select
                </button>
              </div>
            );
          })}
          <Link to="/payment-details">
            <button className="payment-selection-button">Add Payment Method</button>
          </Link>
        </div>
      ) : (
        <>
          <h3>No Saved Payment Info</h3>
          <Link to="/payment-details">
            <button className="payment-selection-button">Add Payment Method</button>
          </Link>
        </>
      )}
      <div>
        {selectedPayment ? (
          <h2 className="selected-payment">Selected Payment: {selectedPayment.card_number}</h2>
        ) : (
          <h2 className="selected-payment">Select a Payment</h2>
        )}
      </div>
      <form onSubmit={orderConfirm}>
        <button className="payment-selection-button" type="submit">Continue</button>
      </form>
    </>
  );
}
