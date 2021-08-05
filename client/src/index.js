import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "../src/redux/store/store";

import { BrowserRouter as Router } from "react-router-dom";
import { Auth0ProviderWithHistory } from "./components";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Auth0ProviderWithHistory>
          <App />
        </Auth0ProviderWithHistory>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
