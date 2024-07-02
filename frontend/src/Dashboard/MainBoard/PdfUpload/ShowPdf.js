import React from 'react';
import { styled } from '@mui/system';

const PdfBox = styled('div')({
  width: '200px',
  height: '200px',
  border: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

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
