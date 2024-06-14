import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import "./css/flags.css";
import "./css/index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // theme
import "primereact/resources/primereact.css"; // core css
import "primeicons/primeicons.css";
import Snowfall from "react-snowfall";

const F = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Login />
        <Snowfall color="#9EA3F3" snowflakeCount={200} />
      </BrowserRouter>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(F());
