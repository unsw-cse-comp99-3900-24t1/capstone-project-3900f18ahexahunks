import { useState } from 'react';
import { styled } from '@mui/material/styles';
import UblUploadBox from './UblUploadBox';
import ShowUblBox from './ShowUblBox';
import useUserStore from '../../../zustand/useUserStore';
import { validateUBL } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';

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
  const { getUser } = useUserStore();
  const { showAlert } = useAlert();

  const handleUpload = async (file, name) => {
    try {
      const user = getUser();
      const userId = user._id;

      if (file && file.type === 'text/xml') {
        const fileURL = URL.createObjectURL(file);
        setXmlFiles((prevXmlFiles) => [...prevXmlFiles, fileURL]);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        // formData.append('name', name);

        const result = await validateUBL(formData);
        if (result.error) {
          console.error('Error converting PDF to UBL:', result.data);
          showAlert('Error converting/uploading PDF', 'tomato'); // Show alert on error
        } else {
          showAlert('UBL successfully validated', 'green');
          console.log('Conversion successful:', result);
        }
      } else {
        showAlert('Invalid file type. Please upload an XML file.', 'tomato');
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      showAlert(
        'An unexpected error occurred. Please try again later.',
        'tomato'
      );
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
