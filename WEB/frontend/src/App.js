import React from "react";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Route, Routes } from "react-router";
import Home from "./Components/Home/BeforLoginHome/Home";
import AddProduct from "./Components/Product Management/Admin/AddProduct";
import ProductDetails from "./Components/Product Management/Admin/ProductDetails";
import UpdateProduct from "./Components/Product Management/Admin/UpdateProduct";
import AllProducDetails from "./Components/Product Management/User/AllProducDetails";
import Login from "./Components/User/Login";
import Register from "./Components/User/Register";
import Profile from "./Components/User/Profile";
import UpdateProfile from "./Components/User/UpdateProfile";
import MyCart from "./Components/Cart Management/MyCart";
import Payment from "./Components/Cart Management/Payment";
import CoinSharePage from "./Components/Coin System/CoinSharePage";
import AddCoupon from "./Components/Admin/Coupon/AddCoupon";
import CouponDashboard from "./Components/Admin/Coupon/CouponDashboard";
import UpdateCoupon from "./Components/Admin/Coupon/UpdateCoupon";
import AfterLoginHome from "./Components/Home/AfterLoginHome/AfterLoginHome";
import AboutUsPage from "./Components/Home/HomePages/AboutUsPage";
import ContactUs from "./Components/Home/HomePages/ContactUs";
import ContactUsAfter from "./Components/Home/HomePages/ContactUsAfter";
import AboutUsPageAfter from "./Components/Home/HomePages/AboutUsPageAfter";
import UserDiscount from "./Components/Admin/Coupon/UserDiscount";
import AminLogin from "./Components/Admin/AminLogin";
import AdminDash from "./Components/Admin/AdminDash";
import OrderDash from "./Components/Admin/OrderDash";

function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<AfterLoginHome />} />
          <Route path="/aboutus" element={<AboutUsPage />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/discountpage" element={<UserDiscount />} />
          <Route path="/productoage" element={<AllProducDetails />} />
          <Route path="/contactafter" element={<ContactUsAfter />} />
          <Route path="/aboutusafter" element={<AboutUsPageAfter />} />
          {/*-----------Product Management-----------*/}
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productdashboard" element={<ProductDetails />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/productall" element={<AllProducDetails />} />
          {/*-----------User Management-----------*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateprofile/:id" element={<UpdateProfile />} />
          {/*-----------Cart Management-----------*/}
          <Route path="/mycart" element={<MyCart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orderdash" element={<OrderDash />} />
          {/*-----------Coin Management-----------*/}
          <Route path="/coinsharipage" element={<CoinSharePage />} />
          {/*-----------Admin-----------*/}
          <Route path="/addcoupon" element={<AddCoupon />} />
          <Route path="/coupondash" element={<CouponDashboard />} />
          <Route path="/updatecoupon/:id" element={<UpdateCoupon />} />
          <Route path="/adminlogin" element={<AminLogin />} />
          <Route path="/admindash" element={<AdminDash />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
