import { useState } from 'react';
import './../PdfUpload/convert.css';

const ValidateBoard = () => {
  const [xmlFiles, setXmlFiles] = useState([]);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/xml') {
      const fileURL = URL.createObjectURL(file);
      setXmlFiles((prevXmlFiles) => [...prevXmlFiles, fileURL]);
    }
  };

  return (
    <div className="board-container">
      {xmlFiles.map((xml, index) => (
        <div key={index} className="xml-box">
          <embed src={xml} type="text/xml" width="100%" height="100%" />
        </div>
      ))}
      <div className="upload-box">
        <input
          type="file"
          accept="text/xml"
          onChange={handleUpload}
          style={{ display: 'none' }}
          id="xml-upload"
        />
        <label htmlFor="xml-upload" className="upload-label">
          +
        </label>
      </div>
    </div>
  );
};
export default ValidateBoard;
