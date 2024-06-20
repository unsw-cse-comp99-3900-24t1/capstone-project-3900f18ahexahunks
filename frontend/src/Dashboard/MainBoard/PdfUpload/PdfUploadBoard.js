import React, { useState } from 'react';
import { styled } from '@mui/system';
import UploadBox from './UploadBox';
import ShowPdf from './ShowPdf';

const BoardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  padding: '10px',
});

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
    <BoardContainer>
      <ShowPdf pdfs={pdfs} />
      <UploadBox handleUpload={handleUpload} />
    </BoardContainer>
  );
};

export default PdfUploadBoard;
