import React from "react";
import Nav from "../NavBar/Nav";
import "./about.css";
import Footer from "./Footer";
import award from './img/award1.png'
import AfterNav from "../NavBar/AfterNav";
function AboutUsPageAfter() {
  return (
    <div>
      <AfterNav />
      <div className="body_container">
        <h1 className="topic_about">Our Story</h1>
        <p className="sb_about">Your Ultimate Online Shopping Destination</p>
        <p className="para_about">
          Welcome to Shopping Eye, the premier online shopping platform where
          you can find everything you need and more! As a multi-award-winning
          e-commerce store, we take pride in delivering an exceptional shopping
          experience to customers around the world. With over 100 diverse
          categories, we offer an extensive selection of products to suit every
          lifestyle, need, and preference.
        </p>
        <p className="para_about">
          At Shopping Eye, we believe in the power of choice. Whether you're
          looking for the latest electronics, stylish fashion, home essentials,
          beauty products, or unique gifts, our platform has it all. Our
          user-friendly interface and advanced search features make it easy for
          you to find exactly what you’re looking for, no matter your taste or
          budget.
        </p>
        <p className="para_about">
          Our commitment to excellence has earned us five prestigious Golden
          Awards for Best Online Web Store. These accolades reflect our
          dedication to quality, customer service, and innovation. We are proud
          to be recognized as a leader in the online retail industry, setting
          new standards for what a digital shopping experience should be.
        </p>
        <p className="para_about">
          With a global presence, Shopping Eye operates 10 branches across the
          USA, Australia, Sri Lanka, Canada, and beyond. Our international reach
          ensures that customers worldwide can enjoy the convenience and
          reliability that Shopping Eye is known for. Backed by a talented team
          of over 500 employees, we work tirelessly to bring you the latest
          trends, top-rated products, and unbeatable deals.
        </p>
        <p className="para_about">
          Shopping Eye is more than just an online store; it’s a community where
          customers are valued and satisfaction is guaranteed. Our secure
          payment options, fast shipping, and exceptional customer support are
          just a few of the reasons why millions trust us for their shopping
          needs.
        </p>
        <p className="para_about">
          Join the Shopping Eye family today and discover why we’re the go-to
          destination for savvy shoppers everywhere. Your perfect purchase is
          just a click away!
        </p>
        <div className="award_box">
          <img src={award} alt="award" className="award"/>
          <img src={award} alt="award" className="award"/>
          <img src={award} alt="award" className="award"/>
          <img src={award} alt="award" className="award"/>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AboutUsPageAfter;
