import React from "react";
import Nav from "../NavBar/Nav";
import "./Home.css";
import Baner1 from "./img/banar1.webp";
import Baner2 from "./img/baner2.webp";
import Baner3 from "./img/baner3.webp";
import Baner4 from "./img/baner4.webp";
import Baner5 from "./img/baner5.webp";
import Baner6 from "./img/baner6.webp";
import Baner7 from "./img/baner7.webp";
import flash1 from "./img/flash1.webp";
import flash2 from "./img/flash2.webp";
import flash3 from "./img/flash3.webp";
import flash4 from "./img/flash4.webp";

import you1 from "./img/you1.webp";
import you2 from "./img/you2.webp";
import you3 from "./img/you3.webp";
import you4 from "./img/you4.webp";
import Footer from "../HomePages/Footer";

function Home() {
  return (
    <div>
      <Nav />
      <div id="slider">
        <figure className="slider_figure">
          <img src={Baner1} alt="baner1" className="banerslider" />
          <img src={Baner2} alt="baner2" className="banerslider" />
          <img src={Baner3} alt="baner3" className="banerslider" />
          <img src={Baner4} alt="baner4" className="banerslider" />
          <img src={Baner5} alt="baner5" className="banerslider" />
          <img src={Baner6} alt="baner6" className="banerslider" />
          <img src={Baner7} alt="baner7" className="banerslider" />
        </figure>
      </div>
      <div className="body_container">
        <div>
          <p className="topic_sb">Flash Sale</p>
          <div className="flash_card_set">
            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={flash1} alt="flash1" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Detergent</p>
                <p className="flashcard_para">
                  Natural Fresh Super Cloth Cleaning Laundry | Detergent Washing
                  Machine
                </p>
              </div>
            </div>
            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={flash2} alt="flash2" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Cream Milk Powder</p>
                <p className="flashcard_para">
                  No chemicals have been added and the milk powder is produced
                  with fresh milk.
                </p>
              </div>
            </div>
            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={flash3} alt="flash3" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Bluetooth Mouse</p>
                <p className="flashcard_para">
                  Bluetooth Wireless Mouse with USB, BT5.2 Rechargeable RGB
                  Mouse for Laptop, PC
                </p>
              </div>
            </div>
            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={flash4} alt="flash4" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">11 pro online key</p>
                <p className="flashcard_para">
                  This Windows 10 Pro genuine key is the perfect solution for
                  those looking to upgrade
                </p>
              </div>
            </div>
          </div>
          <button
            className="wivemoe_btn"
            onClick={() => (window.location.href = "/login")}
          >
            View More
          </button>
        </div>

        <div>
          <p className="topic_sb">Just For You</p>
          <div className="flash_card_set">
            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={flash1} alt="flash1" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Detergent</p>
                <p className="flashcard_para">
                  Natural Fresh Super Cloth Cleaning Laundry | Detergent Washing
                  Machine
                </p>
              </div>
            </div>

            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={you1} alt="flash1" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Sport Shoes</p>
                <p className="flashcard_para">
                  Breathable Mesh Sneakers Comfortable Casual Sport Shoes
                  Fashion Shoes
                </p>
              </div>
            </div>

            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={you2} alt="flash1" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Kojic Acid Soap</p>
                <p className="flashcard_para">
                  Moisturizing coconut oil primes skin for maximum absorption of
                  kojic acid- Reduces
                </p>
              </div>
            </div>

            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={flash2} alt="flash2" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Cream Milk Powder</p>
                <p className="flashcard_para">
                  No chemicals have been added and the milk powder is produced
                  with fresh milk.
                </p>
              </div>
            </div>

            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={you3} alt="flash2" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Gym T-Shirts</p>
                <p className="flashcard_para">
                  Men's Compression Shirt Fitness Sport Running Tight Gym
                  T-Shirts Athletic
                </p>
              </div>
            </div>

            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={you4} alt="flash2" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Body Shape Trimmer</p>
                <p className="flashcard_para">
                  This exercise band features a completely fit hand design,
                  small in size.
                </p>
              </div>
            </div>

            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={flash3} alt="flash3" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">Bluetooth Mouse</p>
                <p className="flashcard_para">
                  Bluetooth Wireless Mouse with USB, BT5.2 Rechargeable RGB
                  Mouse for Laptop, PC
                </p>
              </div>
            </div>

            <div
              className="flash_card"
              onClick={() => (window.location.href = "/login")}
            >
              <img src={flash4} alt="flash4" className="flashsale_img" />
              <div className="flash_card_details">
                <p className="flaashcard_name">11 pro online key</p>
                <p className="flashcard_para">
                  This Windows 10 Pro genuine key is the perfect solution for
                  those looking to upgrade
                </p>
              </div>
            </div>
          </div>
          <button
            className="wivemoe_btn"
            onClick={() => (window.location.href = "/login")}
          >
            View More
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
