import React, { useEffect } from "react";
import { Routes, Route, HashRouter } from "react-router-dom";
import LandingPage from "./pages/landingpage/LandingPage";
import Settings from "./pages/settings/Settings";
import PrivateRoutes from "./pages/landingpage/PrivateRoutes";
import Dispatches from "./pages/dispatches/Dispatches";
import Shopkeeper from "./pages/shopkeeper/Shopkeeper";
import Navbar from "./components/navbar/Navbar";
import { urls } from "./constants/urls";
import "@fontsource/poppins";
import "@fontsource/inter";
import Aos from "aos";
import "aos/dist/aos.css";
import Items from "./pages/items/Items";
import GirlRegistration from "./pages/girl-registration/GirlRegistration";
import Reports from "./pages/reports/Reports";
import UserList from "./pages/user-list/UserList";
import DownloadGirlsAsPDF from "./pages/download-pdf/DownloadGirlsAsPDF";

function App() {
  useEffect(() => {
    Aos.init();
  }, []);
  
  return (
    <HashRouter>
        <Routes>
          <Route path={urls.LANDING_PAGE} element={<LandingPage />} />
          <Route element={<PrivateRoutes/>}>
            <Route path={urls.GIRL_REGISTRATION} element={<Navbar><GirlRegistration/></Navbar>} />
            <Route path={urls.SHOPNAME} element={<Navbar><Shopkeeper/></Navbar>} />
            <Route path={urls.REPORTS} element={<Navbar><Reports/></Navbar>} />
            <Route path={urls.DISTRICT} element={<Navbar><Dispatches/></Navbar>} />
            <Route path={urls.ITEMS} element={<Navbar><Items/></Navbar>} />
            <Route path={urls.USER_LIST} element={<Navbar><UserList/></Navbar>} />
            <Route path={urls.SETTINGS} element={<Navbar><Settings/></Navbar>} />
            <Route path={urls.DOWNLOAD_PDF} element={<DownloadGirlsAsPDF/>} />
          </Route>
        </Routes>
    </HashRouter>
  );
}

export default App;
