import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store";
import ToggleColorMode from "./utils/ToggleColorMode";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <ToggleColorMode>
        <App />
      </ToggleColorMode>
    </Provider>
  </BrowserRouter>
);
