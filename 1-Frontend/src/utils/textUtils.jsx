/**
 * Create a formatted link with proper styling
 * @param {string} language - Current language
 * @returns {JSX.Element} Formatted link element
 */
export const createFormattedLink = (language) => {
  const linkText = language === 'Svenska' ? 'här.' : 'here.';
  
  return (
    <a
      href="https://online.123fakturera.se/us/?height=1080&width=1920"
      style={{
        color: 'rgb(0, 68, 226)',
        textDecoration: 'none',
        cursor: 'pointer',
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {linkText}
    </a>
  );
};

/**
 * Handle external redirects
 * @param {string} url - URL to redirect to
 */
export const handleExternalRedirect = (url) => {
  window.location.href = url;
};
