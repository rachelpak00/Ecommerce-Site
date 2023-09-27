import "./Register.css";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import { createUser } from "../../API";

export default function Register({ loggedIn, setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  async function submit(event) {
    event.preventDefault()
    
    try {
        let data = await createUser(username, password);
        localStorage.setItem('token', data.data)
        localStorage.setItem('userId', data.userId)
        setLoggedIn(true)
        navigate('/')
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <>

      <div onSubmit={submit}  className="register-container">
        <h1 className="register-header">Register</h1>
        <form className="register-form">
          <label htmlFor="username">Username: </label>
          <input
            name="username"
            type="text"
            placeholder="Enter username here"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>

          <label htmlFor="password">Password: </label>
          <input
            name="password"
            type="password"
            placeholder="Enter password here"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>

          <button type="submit" className="registerButton">Register</button>
        </form>
      </div>
    </>
  );
}
