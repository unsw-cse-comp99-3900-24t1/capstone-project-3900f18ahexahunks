import { styled } from '@mui/system';

const UploadContainer = styled('div')({
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

const UploadBox = ({ handleUpload }) => {
  return (
    <UploadContainer>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        style={{ display: 'none' }}
        id="pdf-upload"
      />
      <UploadLabel htmlFor="pdf-upload">+</UploadLabel>
    </UploadContainer>
  );
};
export default UploadBox;
