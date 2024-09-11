import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AfterNav from "../Home/NavBar/AfterNav";
import Footer from "../Home/HomePages/Footer";

function UpdateProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullname: "",
    gmail: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/usermanagement/id/${id}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch user details.");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8081/usermanagement/${id}`, user);
      alert("Profile updated successfully.");
      navigate("/profile");
    } catch (error) {
      alert("Failed to update profile.");
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <AfterNav />
      <div className="body_container">
        <div>
          <h2 className="topic_update">Update Profile</h2>
          <form className="from_container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="from_label" htmlFor="fullname">
                Full Name
              </label>
              <br />
              <input
                className="from_input"
                type="text"
                id="fullname"
                name="fullname"
                value={user.fullname}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="from_label" htmlFor="gmail">
                Email
              </label>
              <br />
              <input
                className="from_input"
                type="email"
                id="gmail"
                name="gmail"
                value={user.gmail}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="from_label" htmlFor="password">
                Password
              </label>
              <br />
              <input
                className="from_input"
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label className="from_label" htmlFor="phone">
                Phone
              </label>
              <br />
              <input
                className="from_input"
                type="text"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="from_btn">
              Update Profile
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UpdateProfile;
