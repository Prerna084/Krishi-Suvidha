import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { I18nProvider } from "./i18n";

import App from "./App";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <I18nProvider defaultLanguage="en">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>
);
