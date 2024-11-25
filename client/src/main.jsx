import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./App.css";
import { Toaster } from "react-hot-toast";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              border: "1px solid #713200",
              padding: "10px",
              color: "#713200",
            },
          }}
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
