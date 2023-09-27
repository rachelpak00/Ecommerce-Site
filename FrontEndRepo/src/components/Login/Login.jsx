import "./Login.css";
import { userLogin } from "../../API";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ loggedIn, setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();

    try {
      let data = await userLogin(username, password);
      console.log(data)
      if (!data.error) {
        localStorage.setItem("token", data.data);
        localStorage.setItem("userId", data.userId);
        setLoggedIn(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="login-container">
        <h1 className="login-header">Login</h1>
        <form onSubmit={submit} className="login-form">
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

          <button type="submit" className="loginButton">Login</button>
        </form>
      </div>
    </>
  );
}
