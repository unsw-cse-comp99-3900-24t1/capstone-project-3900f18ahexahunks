import { styled } from '@mui/material/styles';

const PdfBox = styled('div')({
  width: '200px',
  height: '200px',
  border: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});
const ShowUblBox = ({ xmlFiles }) => {
  return (
    <>
      {xmlFiles.map((xml, index) => (
        <PdfBox key={index}>
          <embed src={xml} type="text/xml" width="100%" height="100%" />
        </PdfBox>
      ))}
    </>
  );
};
export default ShowUblBox;
