import React, { useRef, useEffect } from 'react';
import PDFViewer from './components/PDFViewer'
function App() {
  const captureNodeById = (id) => {
    const element = document.getElementById(id);
    if (element) {
      console.log("Found the element:", element);
      // You can proceed to use html2canvas or other libraries to process the element
    } else {
      console.warn(`Element with id ${id} not found.`);
    }
  };

  useEffect(() => {
    // For demonstration purposes, capturing it once the component mounts
    captureNodeById("myTargetElement");
  }, []); // The empty dependency array ensures this effect runs once after mount

  return (
    <PDFViewer />
  );
}

export default App;
