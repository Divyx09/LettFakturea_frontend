import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Terms from "../Pages/Terms";
import PriceListPage from "../Pages/Pricelist";

function App() {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Terms />} />
        <Route path="/pricelist" element={<PriceListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
