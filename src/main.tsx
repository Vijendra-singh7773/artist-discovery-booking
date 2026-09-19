import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ArtistProfile from "./pages/ArtistProfile";
import Bookings from "./pages/Bookings";
import { AppProvider } from "./store/AppContext";
import "./styles.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/artist/:id" element={<ArtistProfile />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </Layout>
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
