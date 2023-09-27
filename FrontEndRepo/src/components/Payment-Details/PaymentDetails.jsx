import "./PaymentDetails.css";
import { addPaymentInfo } from "../../API";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentDetails({
  myPayment,
  setMyPayment,
  createdPaymentInfo,
  setCreatedPaymentInfo,
}) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [defaultPayment, setDefaultPayment] = useState(false);

  const [showCardNumber, setShowCardNumber] = useState(false);

  const navigate = useNavigate();

  function toggleNumbers() {
    setShowCardNumber(!showCardNumber);
  }

  async function submit(event) {
    event.preventDefault();

    try {
      let data = await addPaymentInfo(
        localStorage.getItem("userId"),
        cardName,
        cardNumber,
        expDate,
        cvv,
        billingAddress,
        defaultPayment
      );
      setCreatedPaymentInfo(data);
      setMyPayment(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1 className="add-payment-header">PLEASE ENTER PAYMENT INFO</h1>
      <form className='add-payment-form' onSubmit={submit}>
        <label htmlFor="card-name">Card Holder Name: </label>
        <input
          name="card-name"
          type="text"
          value={cardName}
          onChange={(event) => {
            setCardName(event.target.value);
          }}
        />
        <label htmlFor="card-number">Card Number:</label>
        <input
          name="card-number"
          type={showCardNumber ? "text" : "password"}
          value={cardNumber}
          onChange={(event) => {
            setCardNumber(event.target.value);
          }}
        />{" "}
        <p style={{ display: "inline-block" }} onClick={toggleNumbers}>
          See Number
        </p>
        <br />
        <label htmlFor="expiration-date">Expiration Date: </label>
        <input
          name="expiration-date"
          type="date"
          value={expDate}
          onChange={(event) => {
            setExpDate(event.target.value);
          }}
        />
        <label htmlFor="cvv">CVV: </label>
        <input
          name="cvv"
          type="text"
          value={cvv}
          onChange={(event) => {
            setCvv(event.target.value);
          }}
        />
        <label htmlFor="billing-address">Billing Address: </label>
        <input
          name="billing-address"
          type="text"
          value={billingAddress}
          onChange={(event) => {
            setBillingAddress(event.target.value);
          }}
        />
        <fieldset>
          <legend>Default Payment</legend>
          <label htmlFor="yes">Yes</label>
          <input
            name="default-payment"
            type="radio"
            id="yes"
            value={true}
            onChange={(event) => {
              setDefaultPayment(event.target.value);
            }}
          />
          <label htmlFor="no">No</label>
          <input
            name="default-payment"
            type="radio"
            id="no"
            value={false}
            onChange={(event) => {
              setDefaultPayment(event.target.value);
            }}
          />
        </fieldset>
        <button className='submit-details-button' type="submit">Submit</button>
      </form>
    </>
  );
}
