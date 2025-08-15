import React from 'react';
import { createFormattedLink } from '../utils/textUtils';
import '../styles/components/TermsContent.css';

const TermsContent = ({ termData, language }) => {
  if (!termData || !termData.terms) {
    return null;
  }

  // Get all terms_text entries and sort them numerically
  const termsEntries = Object.entries(termData.terms)
    .filter(([key]) => key.startsWith('terms_text_'))
    .sort(([a], [b]) => {
      const numA = parseInt(a.match(/\d+/)[0]);
      const numB = parseInt(b.match(/\d+/)[0]);
      return numA - numB;
    });

  const renderFormattedText = (text) => {
    if (!text) return null;

    // Handle HTML content
    if (text.includes('<b>') && text.includes('</b>')) {
      return <div dangerouslySetInnerHTML={{ __html: text }} />;
    }

    // Handle line breaks
    return text.split('\n').map((line, index) => (
      <p key={index} className="terms-paragraph">
        {line.trim()}
      </p>
    ));
  };

  const linkElement = createFormattedLink(language);

  return (
    <div className="terms-content">
      {termsEntries.map(([key, value], index) => {
        // Special handling for terms_text_21 to make the word "here" a clickable link inline
        if (key === 'terms_text_21' && value.includes('here.')) {
          const modifiedText = value.replace(
            'here.',
            '<a href="https://online.123fakturera.se/us/?height=1080&width=1920" target="_blank" rel="noopener noreferrer" style="color: #0094ff; text-decoration: underline; font-weight: 500;">here.</a>'
          );
          
          return (
            <div key={key} className="terms-text-block">
              <div dangerouslySetInnerHTML={{ __html: modifiedText }} />
            </div>
          );
        }

        return (
          <div key={key} className="terms-text-block">
            {renderFormattedText(value)}
          </div>
        );
      })}
    </div>
  );
};

export default TermsContent;
