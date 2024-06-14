import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AboutWe from "./pages/AboutWe";
import PageNotFound from "./pages/PageNotFound";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Services from "./pages/Services";

function RoutesApp() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/services" element={<Services />} />
      <Route path="/" element={<Login />} />
      <Route path="/aboutwe" element={<AboutWe />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default RoutesApp;
