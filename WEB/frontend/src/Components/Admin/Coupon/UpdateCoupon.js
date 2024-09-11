import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import SideBar from "../SideBar/SideBar";

function UpdateCoupon() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coupon, setCoupon] = useState({
    couponName: "",
    couponCode: "",
    description: "",
    price: "",
    startDate: "",
    endDate: "",
  });

  const { couponName, couponCode, description, price, startDate, endDate } =
    coupon;

  const onInputChange = (e) => {
    setCoupon({ ...coupon, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadCoupon();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8081/coupon/${id}`, coupon);
    alert("Coupon Update successfully");
    navigate("/coupondash");
  };
  const loadCoupon = async (e) => {
    const result = await axios.get(`http://localhost:8081/coupon/${id}`);
    setCoupon(result.data);
  };
  return (
    <div>
      <div className="main_body_admin">
        <div className="nav_section">
          <SideBar />
        </div>
        <div className="details_body">
          <h2 className="topic_update">Update Coupon</h2>
          <form className="from_container" onSubmit={(e) => onSubmit(e)}>
            <label className="from_label">Coupon Name</label>
            <input
              className="from_input"
              type="text"
              name="couponName"
              value={couponName}
              onChange={(e) => onInputChange(e)}
              placeholder=""
              required
            />
            <label className="from_label">Coupon Price</label>
            <input
              className="from_input"
              type="number"
              name="price"
              value={price}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label className="from_label">Coupon Code</label>
            <input
              className="from_input"
              type="text"
              name="couponCode"
              value={couponCode}
              onChange={(e) => onInputChange(e)}
              readOnly
            />

            <label className="from_label">Start Date</label>
            <input
              className="from_input"
              type="date"
              name="startDate"
              value={startDate}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label className="from_label">Expired Date</label>
            <input
              className="from_input"
              type="date"
              name="endDate"
              value={endDate}
              onChange={(e) => onInputChange(e)}
              required
            />
            <label className="from_label">Description</label>
            <textarea
              type="text"
              className="from_input"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
              placeholder=""
            />
            <button type="submit" className="from_btn">
              Update Coupon
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCoupon;
