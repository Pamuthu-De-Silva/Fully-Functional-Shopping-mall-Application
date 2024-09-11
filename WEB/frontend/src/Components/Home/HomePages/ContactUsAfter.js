import React from "react";
import Footer from "./Footer";
import "./contactus.css";
import AfterNav from "../NavBar/AfterNav";
function ContactUsAfter() {
  return (
    <div>
      <AfterNav />
      <div>
        <div className="cont_main">
          <h1 className="con_topic">Contact Us</h1>
          <p className="conpara">
            Feel free to reach out to us through our email address or fill out
            the <br /> contact form below. We will be in touch with you soon.
          </p>
        </div>
        <div>
          <div class="contact-us-container">
            <form class="contact-us-form">
              <div class="form-group form-group-name">
                <label for="name" class="form-label form-label-name">
                  Full Name:
                </label>
                <br />
                <input
                  type="text"
                  id="name"
                  name="name"
                  class="form-input form-input-name"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div class="form-group form-group-email">
                <label for="email" class="form-label form-label-email">
                  Email Address:
                </label>
                <br />
                <input
                  type="email"
                  id="email"
                  name="email"
                  class="form-input form-input-email"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div class="form-group form-group-phone">
                <label for="phone" class="form-label form-label-phone">
                  Phone Number:
                </label>
                <br />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  class="form-input form-input-phone"
                  placeholder="Enter your phone number"
                />
              </div>

              <div class="form-group form-group-subject">
                <label for="subject" class="form-label form-label-subject">
                  Subject:
                </label>
                <br />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  class="form-input form-input-subject"
                  placeholder="Enter the subject"
                  required
                />
              </div>

              <div class="form-group form-group-message">
                <label for="message" class="form-label form-label-message">
                  Your Message:
                </label>
                <br />

                <textarea
                  id="message"
                  name="message"
                  class="form-textarea form-textarea-message"
                  placeholder="Enter your message"
                  rows="5"
                  required
                ></textarea>
              </div>

              <div class="form-group form-group-submit">
                <button type="submit" class="form-button form-button-submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUsAfter;
