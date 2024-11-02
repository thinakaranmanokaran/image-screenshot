// MainComponent.jsx
import React, { useState, useEffect } from 'react';
import MobView from './src/assets/MobView'; // Import MobView
import App from './src/App'; // Import App

const MainComponent = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? <MobView /> : <App />}
    </>
  );
};

export default MainComponent;
