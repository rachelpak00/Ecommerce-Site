import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <section className="home-container">
        <div className="promotion-container">
          <h2>Insert Promtion Here</h2>
        </div>

        <div className="men-women-container">
          <Link to="/mens-products">
            <div className="gender-container">
              <h2>Men</h2>
            </div>
          </Link>

          <Link to="/womens-products">
            <div className="gender-container">
              <h2>Women</h2>
            </div>
          </Link>
        </div>
      </section>

      {/* <footer>
        <p>Creators: Christopher Myslenski, Daniel Huziran, Dylan Tevis, Derek Ezika, Rachel Pak</p>
      </footer> */}
    </>
  );
}
