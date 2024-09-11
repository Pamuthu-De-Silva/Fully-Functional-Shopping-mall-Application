import React, { useState, useEffect } from "react";
import axios from "axios";
import "../User/User.css";
import AfterNav from "../Home/NavBar/AfterNav";
import Footer from "../Home/HomePages/Footer";
function CoinSharePage() {
  const [coinDetails, setCoinDetails] = useState({
    senderId: "",
    receiverId: "",
    coinCount: 0,
  });
  const [availableCoins, setAvailableCoins] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch available coins for the current user
    const fetchAvailableCoins = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/coins/get/${userId}`
        );
        setAvailableCoins(response.data.coinCount);
      } catch (error) {
        console.error("Error fetching available coins:", error);
      }
    };
    fetchAvailableCoins();
  }, [userId]);

  const handleInputChange = (e) => {
    setCoinDetails({ ...coinDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (coinDetails.coinCount < 20) {
      setError("You must share at least 20 coins.");
      return;
    }

    if (coinDetails.coinCount > availableCoins) {
      setError("Insufficient coins to share.");
      return;
    }

    try {
      await axios.post("http://localhost:8081/coins/share", {
        senderId: userId,
        receiverId: coinDetails.receiverId,
        coinCount: coinDetails.coinCount,
      });
      alert("Coins shared successfully.");
      // window.location.reload(); 
      window.location.href="/profile";
      setError(null);
      setCoinDetails({ senderId: "", receiverId: "", coinCount: 0 });
    } catch (error) {
      alert("Plase Enter Valid Id");
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <AfterNav />
      <div className="body_container">
        <h2 className="topic_update">Share Coins</h2>
        <form className="from_container" onSubmit={handleSubmit}>
          <div>
            <p className="avalabul">Available Coins: 🪙{availableCoins}</p>
          </div>
          <div>
            <label className="from_label">Receiver User ID:</label>
            <input
              className="from_input"
              type="text"
              name="receiverId"
              value={coinDetails.receiverId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="from_label">Coin Count:</label>
            <input
              className="from_input"
              type="number"
              name="coinCount"
              value={coinDetails.coinCount}
              onChange={handleInputChange}
              min="20"
              required
            />
          </div>

          <button type="submit" className="from_btn">
            Send Coins
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default CoinSharePage;
