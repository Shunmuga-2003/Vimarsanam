import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

// Load Google Fonts
const link = document.createElement("link");
link.rel = "stylesheet";
link.href =
  "https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap";
document.head.appendChild(link);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* Redux Provider wraps entire app — makes store available everywhere */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);