
import { pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';

import '@react-pdf-viewer/page-navigation/lib/styles/index.css';
import React, { useRef, useState } from 'react'
import './PDFViewer.css'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
const PDFViewer = () => {
    const [pdfFile, setPdfFile] = useState(null)
    const [viewPdf, setViewPdf] = useState(null)

    const fileType = ['application/pdf']
    const pageNavigationPluginInstance = pageNavigationPlugin();
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const { jumpToPage } = pageNavigationPluginInstance;
    const handleChange = (e) => {
        let selectedFile = e.target.files[0]
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader()
                reader.readAsDataURL(selectedFile)
                reader.onload = (e) =>{
                    setPdfFile(e.target.result)
                }
            }
            else {
                setPdfFile(null)
            }
        }
        else {
            console.log('No file Selected') 
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (pdfFile !== null) {
            setViewPdf(pdfFile)
        }
        else {
            setViewPdf(null)
        }
    }
    // Ref to access the viewer's API functions
    const viewerRef = useRef();
    const findIndexInPage = (spans, keyStart, keyEnd, pageText) => {
      
      let start = 0, end = 0;
      spans.forEach((span, index) => {
        console.log(`----------\nstart: ${start}\n----------`);
        if (start >= keyStart && start <= keyEnd){
          console.log(start, end)
          span.classList.add("highlight");
        }
        start += span.innerText.length;
      });
    }
    const hightlightText = () => {
      const page = document.querySelector("[aria-label='Page 42']");
      const spans = page.querySelectorAll(".rpv-core__text-layer-text");
      let pageText = "";
      spans.forEach((span) => {
        pageText += span.innerText;
      })
      // pageText
      const key = "42THE FIRST SCHEDULE.—contd.THIRD DIVISION : APPLICATIONS—contd.Description of application.";
      const start = pageText.indexOf(key);
      const end = start + key.length;
      console.log(`start: ${start}\nend: ${end}`);
      findIndexInPage(spans, start, end, pageText);
      console.log(pageText);
    }
 
  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <input type='file' className='form-control' onChange={handleChange} />
            <button type='submit' className='btn btn-success'  >
                View pdf
            </button>
            <br />
            <button onClick={() => {
                jumpToPage(41)
                setTimeout(() => {
                  
                  hightlightText();
                }, 3000);
                
                  
                 
            }}>
                Click me
            </button>
        </form>

        <h2 >View pdf</h2>
        <div className='pdf-container'>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js' > 
                {viewPdf && <>
                        <Viewer 
                        fileUrl={viewPdf}
                         // Correct placement of the ref
                        plugins={[pageNavigationPluginInstance]}
                        />
                </>}
                {!viewPdf && <>No Pdf</>}
            </Worker>
        </div>
    </div>
  )
}

export default PDFViewer