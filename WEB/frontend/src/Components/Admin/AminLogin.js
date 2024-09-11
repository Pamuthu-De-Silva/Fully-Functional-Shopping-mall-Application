import React, { useState } from "react";
import LogBk from "./img/adminlog.webp";
function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // Simple front-end validation
    if (username === "admin" && password === "123") {
      alert("Login successful!");
      window.location.href = "/admindash";
    } else {

      alert("Wrong login credentials!");
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
            <h2 className="auth_topic">Admin Login</h2>
            <div>
              <label className="lable_auth" htmlFor="username">
                Username
              </label>
              <input
                className="auth_input"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="lable_auth" htmlFor="password">
                Password
              </label>
              <input
                className="auth_input"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="authbtn">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
