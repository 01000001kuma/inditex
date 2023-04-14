import React, { useState, useEffect } from 'react';

const Loading = () => {

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStartLoading = () => setIsLoading(true);
    const handleStopLoading = () => setIsLoading(false);

    window.addEventListener('beforeunload', handleStartLoading);
    window.addEventListener('unload', handleStopLoading);

    return () => {
      window.removeEventListener('beforeunload', handleStartLoading);
      window.removeEventListener('unload', handleStopLoading);
    };
  }, []);

  return (
    <div className={`navigation-indicator ${isLoading ? 'show' : ''}`}>
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;