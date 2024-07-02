import React from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';

const PdfBox = styled('div')({
  width: '200px',
  height: '200px',
  border: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.2s',
  borderRadius: '9px',
  '&:hover': {
    border: '1px solid #000',
    backgroundColor: '#027BFF',
    color: '#fff',
  },
});
const ShowUblBox = ({ xmlFiles, isLoading }) => {
  const nav = useNavigate();

  const handleOpenValidationReport = (xml) => {
    nav(`/handle-files/validation-reports/ubl/${xml._id}`);
    console.log('PRINT', xml);
  };

  return (
    <>
      {xmlFiles.map((xml) => (
        <PdfBox key={xml._id} onClick={() => handleOpenValidationReport(xml)}>
          <h1>{xml.name}</h1>
        </PdfBox>
      ))}
      {isLoading && (
        <PdfBox>
          <CircularProgress /> {/* Display loading spinner */}
        </PdfBox>
      )}
    </>
  );
};
export default ShowUblBox;
// {
//   /* <PdfBox key={index}>
//           <embed src={xml} type="text/xml" width="100%" height="100%" />
//         </PdfBox> */
// }
