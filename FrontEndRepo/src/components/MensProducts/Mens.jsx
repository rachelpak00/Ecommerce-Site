import "./Mens.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllProducts } from "../../API";

export default function Mens() {
  const [products, setProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const allProducts = await fetchAllProducts();
        const maleProducts = allProducts.filter((product) => product.gender === 'Male');
        setProducts(maleProducts);
        setDisplayedProducts(maleProducts);
      } catch (error) {
        console.log(error);
      }
    }

    fetchProducts();
  }, []);

  function filterProductsByCategory(category) {
    const filteredProducts = products.filter(
      (product) => product.category === category
    );
    setDisplayedProducts(filteredProducts);
  }

  return (
    <>
      {products.length === 0 ? (
        <h2>Loading ....</h2>
      ) : (
        <>
          <h1 className="products-header">Men's Products</h1>
          <section className="filter-container">
            <div className="filter-buttons">
              <button
                className="filter-button"
                onClick={() => setDisplayedProducts(products)}
              >
                Show All
              </button>
              <button
                className="filter-button"
                onClick={() => filterProductsByCategory("Top")}
              >
                Tops
              </button>
              <button
                className="filter-button"
                onClick={() => filterProductsByCategory("Bottom")}
              >
                Bottoms
              </button>
              <button
                className="filter-button"
                onClick={() => filterProductsByCategory("Shoe")}
              >
                Shoes
              </button>
            </div>
          </section>

          <div className="products-container">
            {displayedProducts.map((product) => (
              <div key={product.id} className="individual-product">
                <header className="product-name">{product.name}</header>
                {product.image_url ? (
                  <img
                    className="product-image"
                    src={product.image_url}
                    alt={`picture of ${product.name}`}
                  />
                ) : (
                  <h1 className="image-unavailable">Image Unavailable</h1>
                )}

                <div className="product-price">${product.price}</div>
                <Link to={`/product/${product.id}`}>
                  <button className="see-details-button">See more details</button>
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}
