import { styled } from '@mui/material/styles';

const UploadBox = styled('div')({
  width: '200px',
  height: '200px',
  border: '1px dashed #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
});

const UploadLabel = styled('label')({
  fontSize: '3em',
  color: '#ccc',
});

const UblUploadBox = ({ handleUpload }) => {
  return (
    <UploadBox>
      <input
        type="file"
        accept="text/xml"
        onChange={handleUpload}
        style={{ display: 'none' }}
        id="xml-upload"
      />
      <UploadLabel htmlFor="xml-upload">+</UploadLabel>
    </UploadBox>
  );
};
export default UblUploadBox;
