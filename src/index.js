import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Router as RouterHistory } from "react-router-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import history from "./utils/history";
import { store } from "./redux/store";

ReactDOM.render(
  <RouterHistory history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </RouterHistory>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
