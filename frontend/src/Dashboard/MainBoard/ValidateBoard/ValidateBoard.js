import { useState } from 'react';
import './../PdfUpload/convert.css';
import { styled } from '@mui/material/styles';

const BoardContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'normal',
  height: '80vh',
  overflow: 'auto',
  width: '90%',
}));

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
    <BoardContainer>
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
    </BoardContainer>
  );
};
export default ValidateBoard;
