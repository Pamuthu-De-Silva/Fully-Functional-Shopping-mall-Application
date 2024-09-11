import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AfterNav from "../Home/NavBar/AfterNav";
import Footer from "../Home/HomePages/Footer";
import coin_user from "./img/coinimg.png";
function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coinCount, setCoinCount] = useState(0); // State to hold coin count
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve user ID from localStorage
    const userId = localStorage.getItem("userId");

    if (userId) {
      // Fetch user details from backend
      axios
        .get(`http://localhost:8081/usermanagement/id/${userId}`)
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch user details.");
          setLoading(false);
        });

      // Fetch coin count for the user
      axios
        .get(`http://localhost:8081/coins/get/${userId}`)
        .then((response) => {
          setCoinCount(response.data.coinCount || 0); // Set coin count from response
        })
        .catch((err) => {
          console.error("Failed to fetch coin details:", err);
          setCoinCount(0); // Default to 0 if there's an error
        });
    } else {
      setError("User not logged in.");
      setLoading(false);
    }
  }, []);

  const handleUpdate = () => {
    if (user) {
      navigate(`/updateprofile/${user.id}`);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      const userId = localStorage.getItem("userId");
      try {
        await axios.delete(`http://localhost:8081/usermanagement/${userId}`);
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        alert("Account deleted successfully.");
        window.location.href = "/"; // Redirect to homepage or login page
      } catch (error) {
        alert(
          "You Can't Delete This Account Because You Donate Coins Your Friends"
        );
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>No user data available.</div>;
  }
  return (
    <div>
      <AfterNav />
      <div className="body_container">
        <h1 className="welcomemsg">Welcome Back {user.fullname}</h1>
        <div className="body_card_set">
          <div className="left_card profile_details">
            <div className="">
              <p className="itm_profile">
                UserID <span className="detail_pro">{user.id}</span>
              </p>
              <p className="itm_profile">
                Username <span className="detail_pro">{user.username}</span>
              </p>
              <p className="itm_profile">
                Full Name <span className="detail_pro">{user.fullname}</span>
              </p>
              <p className="itm_profile">
                Email <span className="detail_pro">{user.gmail}</span>
              </p>
              <p className="itm_profile">
                Phone <span className="detail_pro">{user.phone}</span>
              </p>
            </div>
            <div className="probtn_set">
              <button onClick={handleUpdate} className="update_button">
                Update Profile
              </button>
              <button onClick={handleDelete} className="delete_button">
                Delete Account
              </button>
            </div>
          </div>
          <div className="right_card">
            <img src={coin_user} alt="coinimg" className="coin_img" />
            <p className="coin_count">You Have 🪙{coinCount} Coins</p>
            <button
              className="send_coin_btn"
              onClick={() => (window.location.href = "/coinsharipage")}
            >
              Send Coins
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
