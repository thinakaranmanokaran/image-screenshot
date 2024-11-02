import React, { useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const ScreenshotComponent = () => {
  const screenshotRef = useRef(null);
  const [image, setImage] = useState(null);

  const captureScreenshot = () => {
    if (screenshotRef.current) {
      html2canvas(screenshotRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        setImage(imgData);
      });
    }
  };

  return (
    <div>
      <div ref={screenshotRef} style={{ padding: '20px', border: '1px solid #ccc' }}>
        <h1>Your Web Content</h1>
        <p>Anything inside this div can be captured as an image.</p>
      </div>
      
      <button onClick={captureScreenshot} style={{ marginTop: '20px' }}>
        Capture Screenshot
      </button>

      {image && (
        <div style={{ marginTop: '20px' }}>
          <h2>Screenshot Preview:</h2>
          <img src={image} alt="Screenshot" style={{ width: '100%', maxWidth: '500px' }} />
          <a href={image} download="screenshot.png">
            Download Image
          </a>
        </div>
      )}
    </div>
  );
};

export default ScreenshotComponent;
