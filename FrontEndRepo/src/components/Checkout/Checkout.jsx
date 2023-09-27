import "./Checkout.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { addUserDetails } from "../../API";

export default function Checkout({ myDetails, setMyDetails }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    try {
      let data = await addUserDetails(
        localStorage.getItem("userId"),
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        postalCode,
        country
      );
      navigate("/payment-selection");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {!myDetails.error ? (
        <div className="info-container">
          <h1 className="info-header">Confirm Your Info</h1>
          <h3 className="details-info">
            First Name: {myDetails.first_name} Last Name: {myDetails.last_name}
          </h3>
          <h3 className="details-info">Address: {myDetails.address}</h3>
          <h3 className="details-info">
            City: {myDetails.city} State: {myDetails.state}
          </h3>
          <h3 className="details-info">
            Zip Code: {myDetails.postal_code} Country: {myDetails.country}
          </h3>
          <Link to="/payment-selection">
            <button className="confirm-button">Confirm</button>
          </Link>
        </div>
      ) : (
        <>
          <h1>PLEASE ENTER YOUR INFORMATION</h1>
          <form onSubmit={submit}>
            <label htmlFor="first-name">First Name: </label>
            <input
              name="first-name"
              type="text"
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
            <label htmlFor="last-name">Last Name: </label>
            <input
              name="last-name"
              type="text"
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <label htmlFor="address">Street Address: </label>
            <input
              name="address"
              type="text"
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
            <label htmlFor="city">City: </label>
            <input
              name="city"
              type="text"
              value={city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
            />
            <label htmlFor="state">State: </label>
            <input
              name="last-name"
              type="text"
              value={state}
              onChange={(event) => {
                setState(event.target.value);
              }}
            />
            <label htmlFor="postal-code">Postal/Zip Code: </label>
            <input
              name="postal-code"
              type="text"
              value={postalCode}
              onChange={(event) => {
                setPostalCode(event.target.value);
              }}
            />
            <label htmlFor="country">Country: </label>
            <input
              name="country"
              type="text"
              value={country}
              onChange={(event) => {
                setCountry(event.target.value);
              }}
            />

            <button type="submit">Continue</button>
          </form>
        </>
      )}
    </>
  );
}
