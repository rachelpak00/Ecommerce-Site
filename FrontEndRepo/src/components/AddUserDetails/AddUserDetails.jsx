import { useState, useEffect } from "react";
import { addUserDetails } from "../../API";
import './AddUserDetails.css'

export default function AddUserDetails({ setMyDetails, myDetails, setCreateUserDetails }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

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
      setCreateUserDetails(data)
      if(data)(
        setMyDetails(data)
      )
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1 className="add-user-details-header">PLEASE ENTER YOUR INFORMATION</h1>
      <form className='add-user-details-form' onSubmit={submit}>
        <label className='add-details-label' htmlFor="first-name">First Name: </label>
        <input
          name="first-name"
          type="text"
          value={firstName}
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
        />
        <label className='add-details-label' htmlFor="last-name">Last Name: </label>
        <input
          name="last-name"
          type="text"
          value={lastName}
          onChange={(event) => {
            setLastName(event.target.value);
          }}
        />
        <label className='add-details-label' htmlFor="email">Email: </label>
        <input
          name="email"
          type="text"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label className='add-details-label' htmlFor="address">Street Address: </label>
        <input
          name="address"
          type="text"
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <label className='add-details-label' htmlFor="city">City: </label>
        <input
          name="city"
          type="text"
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
        />
        <label className='add-details-label' htmlFor="state">State: </label>
        <input
          name="last-name"
          type="text"
          value={state}
          onChange={(event) => {
            setState(event.target.value);
          }}
        /> 
        <label className='add-details-label' htmlFor="postal-code">Postal/Zip Code: </label>
        <input
          name="postal-code"
          type="text"
          value={postalCode}
          onChange={(event) => {
            setPostalCode(event.target.value);
          }}
        />
        <label className='add-details-label' htmlFor="country">Country: </label>
        <input
          name="country"
          type="text"
          value={country}
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />

        <button className='submit-details-button' type="submit">Continue</button>
      </form>
    </>
  );
}
