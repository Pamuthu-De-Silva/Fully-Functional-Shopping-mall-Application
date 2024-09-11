import React from "react";
import "./footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
function Footer() {
  return (
    <div className="footer_ful">
      <div className="body_container">
        <div className="section_footer">
          <div className="sub_box">
            <h4 className="footer_topic">Shooping EYE</h4>
            <p className="footer_p">
              What was the last time you had an exciting and rewarding online
              shopping experience? Can’t remember! How about we make it even
              more convenient, fast and affordable to fulfill all your buying
              needs? With Sri Lanka's biggest online shopping store,
            </p>
          </div>
          <div className="sub_box">
            <h4 className="footer_topic">Shooping EYE</h4>
            <p className="footer_p">Home</p>
            <p className="footer_p">Product</p>
            <p className="footer_p">careers</p>
            <p className="footer_p">AboutUs</p>
            <p className="footer_p">ContactUs</p>
            <p className="footer_p">FAQ</p>
          </div>
          <div className="sub_box">
            <h4 className="footer_topic">Conet With Us</h4>
            <div className="icon_set_footer">
              <div className="icon_s">
                <FaFacebook className="iccon" />
              </div>
              <div className="icon_s">
                <FaYoutube className="iccon" />
              </div>
              <div className="icon_s">
                <FaSquareWhatsapp className="iccon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
