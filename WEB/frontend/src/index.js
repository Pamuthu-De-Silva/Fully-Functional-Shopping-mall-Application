import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// Add your PayPal client ID here
const initialOptions = {
  clientId: 'ASTqKkNp785I82qiM_PoOs_9YPUtV6-ZwRLt4sIOD8veVRcMDhEAh-Zk4xiy0ruxB5HetBqkQPLa3fzm', // Replace with your actual PayPal Client ID
  currency: 'USD', // Optional: specify the currency
};

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <PayPalScriptProvider options={initialOptions}>
        <App />
      </PayPalScriptProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
