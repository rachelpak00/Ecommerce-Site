import "./Header.css";
import { Link, useNavigate } from "react-router-dom";

export default function Header({ loggedIn, setLoggedIn }) {
  const navigate = useNavigate()
  return (
    <>
      <header className="header">
        <h1>Dylan's Deals</h1>
      </header>
      {loggedIn ? (
        <nav className="nav-container">
          <div className="nav">
            <Link to="/">
              <h3 className="nav-buttons">Home</h3>
            </Link>
            <Link to="/mens-products">
              <h3 className="nav-buttons">Men</h3>
            </Link>
            <Link to="/womens-products">
              <h3 className="nav-buttons">Women</h3>
            </Link>
          </div>
          <div className="user-nav">
            <Link to="/cart">
              <h3 className="user-nav-buttons">Cart</h3>
            </Link>
            <Link to="/profile">
              <h3 className="user-nav-buttons">Profile</h3>
            </Link>
            <Link to="/create-product">
              <h3 className="user-nav-buttons">Create a Product</h3>
            </Link>
            <Link to="/admin-dashboard">
              <h3 className="user-nav-buttons">Admin Dashboard</h3>
            </Link>
            <h3
              className="user-nav-buttons"
              onClick={() => {
                setLoggedIn(false);
                localStorage.clear();
                navigate('/')
              }}
            >
              Logout
            </h3>
          </div>
        </nav>
      ) : (
        <nav className="nav-container">
          <div className="nav">
            <Link to="/">
              <h3 className="nav-buttons">Home</h3>
            </Link>
            <Link to="/mens-products">
              <h3 className="nav-buttons">Men</h3>
            </Link>
            <Link to="/womens-products">
              <h3 className="nav-buttons">Women</h3>
            </Link>
          </div>
          <div className="user-nav">
            <Link to="/login">
              <h3 className="user-nav-buttons">Login</h3>
            </Link>
            <Link to="/register">
              <h3 className="user-nav-buttons">Register</h3>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
}
