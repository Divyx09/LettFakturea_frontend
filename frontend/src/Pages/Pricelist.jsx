import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import PriceList from "../components/PricelistRow";
import "../assets/CSS/PriceListPage.css";

const PriceListPage = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="main-section">
        <Sidebar />
        <PriceList />
      </div>
    </div>
  );
};

export default PriceListPage;
