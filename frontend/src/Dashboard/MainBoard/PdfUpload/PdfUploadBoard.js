import { useState } from 'react';
import './convert.css';

const PdfUploadBoard = () => {
  const [pdfs, setPdfs] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setPdfs((prevPdfs) => [...prevPdfs, fileURL]);
    }
  };

  return (
    <div className="board-container">
      {pdfs.map((pdf, index) => (
        <div key={index} className="pdf-box">
          <embed src={pdf} type="application/pdf" width="100%" height="100%" />
        </div>
      ))}
      <div className="upload-box">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleUpload}
          style={{ display: 'none' }}
          id="pdf-upload"
        />
        <label htmlFor="pdf-upload" className="upload-label">
          +
        </label>
      </div>
    </div>
  );
};
export default PdfUploadBoard;
