import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TermsPage from '../pages/TermsPage';
import PricelistPage from '../pages/PricelistPage';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<TermsPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/pricelist" element={<PricelistPage />} />
    </Routes>
  );
}

export default AppRouter;
