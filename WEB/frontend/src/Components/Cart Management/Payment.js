import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import AfterNav from "../Home/NavBar/AfterNav";
import Footer from "../Home/HomePages/Footer";

function PaymentPage() {
  const [userDetails, setUserDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({
    address: "",
    cardnumber: "",
    cvv: "",
    expdate: "",
    cardholdername: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [coins, setCoins] = useState(0);
  const [couponCode, setCouponCode] = useState(""); // State for coupon code
  const [discount, setDiscount] = useState(0); // State for discount amount
  const navigate = useNavigate();
  const location = useLocation();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:8081/user/${userId}`);
        setUserDetails(result.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();

    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get("totalPrice");
    setTotalPrice(price ? parseFloat(price) : 0);
  }, [userId, location.search]);

  const handleInputChange = (e) => {
    setPaymentDetails({ ...paymentDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalPrice = totalPrice - discount;
    try {
      await axios.post("http://localhost:8081/payment/process", {
        userId,
        address: paymentDetails.address,
        cardnumber: paymentDetails.cardnumber,
        cvv: paymentDetails.cvv,
        expdate: paymentDetails.expdate,
        cardholdername: paymentDetails.cardholdername,
        totalPrice: finalPrice,
      });

      const fullCoinsToAdd = Math.floor(finalPrice / 100) * 20;
      setCoins(fullCoinsToAdd);
      await handleCoinUpdate(userId, fullCoinsToAdd);

      alert(`Payment processed successfully. You won ${fullCoinsToAdd} coins`);
      navigate("/profile");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  const handleCoinUpdate = async (userId, coins) => {
    try {
      await axios.post("http://localhost:8081/coins/add", {
        userId,
        coinCount: coins,
      });
    } catch (error) {
      console.error("Error updating coins:", error);
    }
  };

  return (
    <div>
      <AfterNav />
      <div className="body_container">
        <div>
          <h2 className="topic_update">Payment Details</h2>
          <form className="from_container" onSubmit={handleSubmit}>
            <div>
              <label className="from_label">Address:</label>
              <input
                className="from_input"
                type="text"
                name="address"
                value={paymentDetails.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="from_label">Card Number:</label>
              <input
                className="from_input"
                type="text"
                name="cardnumber"
                value={paymentDetails.cardnumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="from_label">CVV:</label>
              <input
                className="from_input"
                type="text"
                name="cvv"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="from_label">Expiry Date:</label>
              <input
                className="from_input"
                type="date"
                name="expdate"
                value={paymentDetails.expdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label className="from_label">Cardholder Name:</label>
              <input
                className="from_input"
                type="text"
                name="cardholdername"
                value={paymentDetails.cardholdername}
                onChange={handleInputChange}
                required
              />
            </div>

            <p className="tot_price">Total Price: ${totalPrice.toFixed(2)}</p>

            <button className="from_btn" type="submit">
              Submit Payment
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PaymentPage;
