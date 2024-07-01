import { styled } from '@mui/material/styles';
import useValidatorStore from '../../../zustand/useValidatorStore';
import { useEffect } from 'react';

const PdfBox = styled('div')({
  width: '200px',
  height: '200px',
  border: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});
const ShowUblBox = ({ xmlFiles }) => {
  console.log(xmlFiles, 'xmlFiles');
  const getValidatorData = useValidatorStore((state) => state.getValidatorData);
  useEffect(() => {
    const validatorData = getValidatorData();
    console.log('Validator Data:', validatorData);
  }, [getValidatorData]);

  const handleOpenValidationReport = (xml) => {
    console.log('PRINT', xml);
  };

  return (
    <>
      {xmlFiles.map((xml) => (
        <PdfBox key={xml._id} onClick={() => handleOpenValidationReport(xml)}>
          <h1>{xml.name}</h1>
        </PdfBox>
      ))}
    </>
  );
};
export default ShowUblBox;
// {
//   /* <PdfBox key={index}>
//           <embed src={xml} type="text/xml" width="100%" height="100%" />
//         </PdfBox> */
// }
