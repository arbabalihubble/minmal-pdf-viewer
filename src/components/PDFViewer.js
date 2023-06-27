// import React, { useState, useEffect } from 'react'
// import './PDFViewer.css'
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
// import { Viewer, Worker } from '@react-pdf-viewer/core'
// import '@react-pdf-viewer/core/lib/styles/index.css'
// import '@react-pdf-viewer/default-layout/lib/styles/index.css'

// const PDFViewer = () => {
//     const [pdfFile, setPdfFile] = useState(null)
//     const [viewPdf, setViewPdf] = useState(null)
//     const [searchText, setSearchText] = useState('')
//     const [searchPlugin, setSearchPlugin] = useState(null)

//     const fileType = ['application/pdf']

//     const handleChange = (e) => {
//         let selectedFile = e.target.files[0]
//         if (selectedFile) {
//             if (selectedFile && fileType.includes(selectedFile.type)) {
//                 let reader = new FileReader()
//                 reader.readAsDataURL(selectedFile)
//                 reader.onload = (e) => {
//                     setPdfFile(e.target.result)
//                 }
//             } else {
//                 setPdfFile(null)
//             }
//         } else {
//             console.log('No file Selected')
//         }
//     }

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         if (pdfFile !== null) {
//             setViewPdf(pdfFile)
//         } else {
//             setViewPdf(null)
//         }
//     }

//     // const handleSearch = () => {
//     //     searchPlugin.instance.search(searchText)
//     // }

//     // const handleSearchTextChange = (e) => {
//     //     setSearchText(e.target.value)
//     // }

//     // useEffect(() => {
//     //     setSearchPlugin(defaultLayoutPlugin)
//     // }, [])

//     return (
//         <div className='container'>
//             <form onSubmit={handleSubmit}>
//                 <input type='file' className='form-control' onChange={handleChange} />
//                 <button type='submit' className='btn btn-success'>
//                     View pdf
//                 </button>
//             </form>

//             <h2>View pdf</h2>
//             <div className='pdf-container'>
//                 <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
//                     {viewPdf && searchPlugin && (
//                         <>
//                             {/* <div className='search-container'>
//                                 <input type='text' value={searchText} onChange={handleSearchTextChange} />
//                                 <button onClick={handleSearch}>Search</button>
//                             </div> */}
//                             <Viewer fileUrl={viewPdf} plugins={[searchPlugin]} />
//                         </>
//                     )}
//                     {/* {viewPdf && !searchPlugin && <div>Loading...</div>} */}
//                     {!viewPdf && <div>No Pdf</div>}
//                 </Worker>
//             </div>
//         </div>
//     )
// }

// export default PDFViewer

import React, { useState } from 'react'
import './PDFViewer.css'
import { Viewer, Worker } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
const PDFViewer = () => {
    const [pdfFile, setPdfFile] = useState(null)
    const [viewPdf, setViewPdf] = useState(null)

    const fileType = ['application/pdf']

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

    const newpluggin = defaultLayoutPlugin()

  return (
    <div className='container'>
        <form onSubmit={handleSubmit}>
            <input type='file' className='form-control' onChange={handleChange} />
            <button type='submit' className='btn btn-success'  >
                View pdf
            </button>
        </form>

        <h2>View pdf</h2>
        <div className='pdf-container'>
            <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
                {viewPdf && <>
                        <Viewer fileUrl={viewPdf} plugins={[newpluggin]} />
                </>}
                {!viewPdf && <>No Pdf</>}
            </Worker>
        </div>
    </div>
  )
}

export default PDFViewer