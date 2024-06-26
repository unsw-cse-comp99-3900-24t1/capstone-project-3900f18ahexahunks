import { useState } from 'react';
import { styled } from '@mui/material/styles';
import UblUploadBox from './UblUploadBox';
import ShowUblBox from './ShowUblBox';

const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'normal',
  height: '80vh',
  overflow: 'auto',
  width: '80%',
}));

const BoardWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  width: '100%',
});

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
      <BoardWrapper>
        <ShowUblBox xmlFiles={xmlFiles} />
        <UblUploadBox handleUpload={handleUpload} />
      </BoardWrapper>
    </BoardContainer>
  );
};

export default ValidateBoard;
