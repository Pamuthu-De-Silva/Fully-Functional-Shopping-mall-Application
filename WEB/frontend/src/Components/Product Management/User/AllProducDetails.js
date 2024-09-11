import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../../Home/HomePages/Footer";
import AfterNav from "../../Home/NavBar/AfterNav";
import "./ProductUser.css";

function AllProducDetails() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const userId = JSON.parse(localStorage.getItem("user")).id;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const result = await axios.get("http://localhost:8081/productmanagement");
      const products = result.data;
      setProducts(products);
      setFilteredProducts(products);

      // Extract unique categories
      const uniqueCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };

  const addToCart = async (productId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).id;
      const cartRequest = {
        userId: userId,
        productId: productId,
        quantity: 1,
      };

      await axios.post("http://localhost:8081/cart/add", cartRequest);
      alert("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add product to cart.");
    }
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value === "") {
      setFilteredProducts(
        selectedCategory === "All"
          ? products
          : products.filter((product) => product.category === selectedCategory)
      );
    } else {
      setFilteredProducts(
        products.filter(
          (product) =>
            product.itemname
              .toLowerCase()
              .includes(event.target.value.toLowerCase()) &&
            (selectedCategory === "All" ||
              product.category === selectedCategory)
        )
      );
    }
  };
  return (
    <div>
      <AfterNav />
      <div className="body_container">
        <div>
          <div>
            <div className="search_bar">
              <input
                type="text"
                placeholder="Search for products By Name..."
                className="search_input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
        {/* Category Filter Buttons */}
        <div className="category_buttons">
          <button
            className={`category_button ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => filterByCategory("All")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category_button ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => filterByCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Display */}
        <div className="product_grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product_card">
              <div className="product_image">
                <img
                  src={`http://localhost:8081/${product.imagePath}`}
                  alt={product.itemname}
                  className="product_image"
                />
              </div>
              <div className="product_id">ID: {product.id}</div>
              <div className="flash_card_details">
                <div className="product_name">{product.itemname}</div>
                <div className="product_price">Rs.{product.price}.00</div>
                <div className="product_description">{product.description}</div>
                <div>
                  <button
                    className="product_action"
                    onClick={() => addToCart(product.id)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AllProducDetails;
