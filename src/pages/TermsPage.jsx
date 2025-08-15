import React, { useEffect, useState, useRef } from "react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import TermsContent from "../components/TermsContent";
import { useLanguage } from "../context/LanguageContext";
import { termsService } from "../services/dataService";
import { handleExternalRedirect } from "../utils/textUtils";
import { EXTERNAL_LINKS } from "../utils/constants";
import "../styles/pages/TermsPage.css";

const TermsPage = () => {
  const [termData, setTermData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { language, setLanguage } = useLanguage();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    fetchTerms(language);
  }, [language]);

  const fetchTerms = async (lang, forceLoading = false) => {
    try {
      // Show loading spinner on initial load or when force loading is requested (like retry)
      if (isInitialLoad.current || forceLoading) {
        setLoading(true);
      }
      setError(null);

      const data = await termsService.getTermsByLanguage(lang);

      if (Array.isArray(data) && data.length > 0) {
        setTermData(data[0]);
      } else {
        setError(`No terms found for language: ${lang}`);
      }
    } catch (err) {
      console.error("Failed to load terms:", err);
      setError("Failed to load terms. Please try again later.");
    } finally {
      if (isInitialLoad.current || forceLoading) {
        setLoading(false);
        if (isInitialLoad.current) {
          isInitialLoad.current = false; // Mark initial load as complete
        }
      }
    }
  };

  const handleBackClick = () => {
    handleExternalRedirect(EXTERNAL_LINKS.REDIRECT_URL);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={() => fetchTerms(language, true)} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!termData) {
    return (
      <div className="error-container">
        <p className="error-message">No terms data available</p>
      </div>
    );
  }

  return (
    <div className="terms-page">
      <div className="terms-header">
        <Navbar
          options={
            termData?.navigation
              ? [
                  termData.navigation.home,
                  termData.navigation.order,
                  termData.navigation.our_customer,
                  termData.navigation.about_us,
                  termData.navigation.contact_us,
                ]
              : []
          }
          language={language}
          onLanguageChange={setLanguage}
        />
        <h2 className="term">{termData.terms.terms}</h2>
        <button className="back-button" onClick={handleBackClick}>
          {termData.terms.close}
        </button>
      </div>

      <TermsContent termData={termData} language={language} />

      <button className="bottom-button" onClick={handleBackClick}>
        {termData.terms.close}
      </button>
    </div>
  );
};

export default TermsPage;
