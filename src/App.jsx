import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";
import ProductList from "./pages/product-list/ProductList";
import QRItemList from "./pages/qr-item-list/QRItemList";
import Settings from "./pages/settings/Settings";
import PrivateRoutes from "./pages/landingpage/PrivateRoutes";
import Navbar from "./components/navbar/Navbar";
import { urls } from "./constants/urls";
import "@fontsource/poppins";
import "@fontsource/inter";
import Aos from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  
  return (
    <HashRouter>
        <Routes>
          <Route path={urls.LANDING_PAGE} element={<LandingPage />} />
          <Route element={<PrivateRoutes/>}>
            <Route path={urls.DISTRICT} element={<Navbar><ProductList/></Navbar>} />
            <Route path={urls.SHOPNAME} element={<Navbar><QRItemList/></Navbar>} />
            <Route path={urls.SETTINGS} element={<Navbar><Settings/></Navbar>} />
          </Route>
        </Routes>
    </HashRouter>
  );
}

export default App;
