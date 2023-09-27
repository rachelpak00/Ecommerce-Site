import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "../../API";

export default function UpdateUserDetails({
  updatedDetails,
  setUpdatedDetails,
  myDetails,
  setMyDetails,
}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState(myDetails.first_name);
  const [lastName, setLastName] = useState(myDetails.last_name);
  const [email, setEmail] = useState(myDetails.email);
  const [address, setAddress] = useState(myDetails.address);
  const [city, setCity] = useState(myDetails.city);
  const [state, setState] = useState(myDetails.state);
  const [postalCode, setPostalCode] = useState(myDetails.postal_code);
  const [country, setCountry] = useState(myDetails.country);

  const navigate = useNavigate()

  async function submit() {
    try {
      let data = await updateUserDetails(
        localStorage.getItem("userId"),
        username,
        password,
        firstName,
        lastName,
        email,
        address,
        city,
        state,
        postalCode,
        country
      );
      setUpdatedDetails(data)
      if(data){
        setMyDetails(data)
      }
      navigate('/profile')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <>
        <h1>PLEASE ENTER YOUR INFORMATION</h1>
        <h2>Please enter username and password</h2>
        <form onSubmit={submit}>
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            type="text"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>

          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
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
    </>
  );
}
