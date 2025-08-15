import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import PriceList from '../components/PriceList';
import '../styles/pages/PricelistPage.css';

const PricelistPage = () => {
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

export default PricelistPage;
