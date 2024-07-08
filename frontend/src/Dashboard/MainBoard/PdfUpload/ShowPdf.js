import React from 'react';
import { styled } from '@mui/system';

const PdfBox = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '200px',
  height: '200px',
  margin: '10px',
  border: '2px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '12px',
  backgroundColor: '#f0f0f0',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    borderColor: '#651FFF',
    backgroundColor: '#ffffff',
  },
}));

const ShowPdf = ({ pdfs }) => {
  return (
    <div>
      {pdfs.map((pdf, index) => (
        <PdfBox key={index}>
          <embed src={pdf} type="application/pdf" width="100%" height="100%" />
        </PdfBox>
      ))}
    </div>
  );
};
export default ShowPdf;
