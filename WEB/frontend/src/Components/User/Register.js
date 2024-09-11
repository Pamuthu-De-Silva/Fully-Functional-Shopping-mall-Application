import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User.css";
import LogBk from "./img/regbk.jpg";
function Register() {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8081/usermanagement", {
        username,
        fullname,
        gmail,
        password,
        phone,
      });
      alert("Registration successful!");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth_container">
      <div className="login-container">
        <div className="login_container_new">
          <div className="lft_auth">
            <img src={LogBk} alt="logo" className="img_lftlog" />
          </div>
          <form className="riht_auth" onSubmit={handleSubmit}>
            <h2 className="auth_topic_update">Register</h2>
            <div className="form-group">
              <label className="lable_auth" htmlFor="username">
                Username
              </label>
              <input
                className="auth_input"
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="lable_auth" htmlFor="fullname">
                Full Name
              </label>
              <input
                className="auth_input"
                type="text"
                id="fullname"
                name="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="lable_auth" htmlFor="gmail">
                Email
              </label>
              <input
                className="auth_input"
                type="email"
                id="gmail"
                name="gmail"
                value={gmail}
                onChange={(e) => setGmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="lable_auth" htmlFor="password">
                Password
              </label>
              <input
                className="auth_input"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="lable_auth" htmlFor="phone">
                Phone
              </label>
              <input
                className="auth_input"
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="authbtn">
              Register
            </button>
            <p className="no_acc">
              If Your have account ?{" "}
              <span
                className="link"
                onClick={() => (window.location.href = "/login")}
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
