import React, { useState, useEffect } from "react";
import "./nav.css";
import Logo from "./img/logo.png";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
function AfterNav() {
  const [activePage, setActivePage] = useState("");

  useEffect(() => {
    // Set the active page based on the current path
    setActivePage(window.location.pathname);
  }, []);

  // Determine if the current page is active
  const isActive = (path) => activePage === path;
  return (
    <div>
      <div className="nav_bar">
        <div>
          <img src={Logo} alt="logo" className="logo_nav" />
        </div>
        <div className="nav_item">
          <h3
            className={`nav_item_action ${
              isActive("/home") ? "nav_item_action_active" : ""
            }`}
            onClick={() => (window.location.href = "/home")}
          >
            Home
          </h3>
          <h3
            className={`nav_item_action ${
              isActive("/discountpage") ? "nav_item_action_active" : ""
            }`}
            onClick={() => (window.location.href = "/discountpage")}
          >
            Discount Deal
          </h3>
          <h3
            className={`nav_item_action ${
              isActive("/productoage") ? "nav_item_action_active" : ""
            }`}
            onClick={() => (window.location.href = "/productoage")}
          >
            Products
          </h3>

          <h3
            className={`nav_item_action ${
              isActive("/Shops") ? "nav_item_action_active" : ""
            }`}
            onClick={() => (window.location.href = "/Shops")}
          >
            Shops
          </h3>

          <h3
            className={`nav_item_action ${
              isActive("/aboutusafter") ? "nav_item_action_active" : ""
            }`}
            onClick={() => (window.location.href = "/aboutusafter")}
          >
            About Us
          </h3>
          <h3
            className={`nav_item_action ${
              isActive("/contactafter") ? "nav_item_action_active" : ""
            }`}
            onClick={() => (window.location.href = "/contactafter")}
          >
            Contact Us
          </h3>
          <div className="nav_btn">
            <FaUserCircle
              className={`icon_nav ${
                isActive("/profile") ? "icon_nav_active" : ""
              }`}
              onClick={() => (window.location.href = "/profile")}
            />
            <FaShoppingCart
              className={`icon_nav ${
                isActive("/mycart") ? "icon_nav_active" : ""
              }`}
              onClick={() => (window.location.href = "/mycart")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfterNav;
