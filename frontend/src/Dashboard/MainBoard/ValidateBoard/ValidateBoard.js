import React from 'react';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import UblUploadBox from './UblUploadBox';
import ShowUblBox from './ShowUblBox';
import useUserStore from '../../../zustand/useUserStore';
import { getAllValidationUblInfo, validateUBL } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';
import useValidatorStore from '../../../zustand/useValidatorStore';

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
  const [isLoading, setIsLoading] = useState(false);
  const addValidatorData = useValidatorStore((state) => state.addValidatorData);
  const setLatestData = useValidatorStore((state) => state.setLatestData);

  useEffect(() => {
    const fetchInitialXmlFiles = async () => {
      try {
        const user = getUser();
        const userId = user._id;
        const result = await getAllValidationUblInfo({ userId });
        if (result.error) {
          console.error('Error fetching initial XML files:', result);
          showAlert('Error fetching initial XML files', 'tomato');
        } else {
          setXmlFiles(result);
          setLatestData(result);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        showAlert(
          'An unexpected error occurred while fetching initial XML files. Please try again later.',
          'tomato'
        );
      }
    };

    fetchInitialXmlFiles();
  },[]);

  const handleUpload = async (file, name) => {
    setIsLoading(true);
    try {
      const user = getUser();
      const userId = user._id;

      if (file && file.type === 'text/xml') {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('name', name);

        const result = await validateUBL(formData);
        if (result.error) {
          console.error('Error converting PDF to UBL:', result);
          showAlert('Error converting/uploading PDF', 'tomato');
        } else {
          showAlert('UBL successfully validated', 'green');
          console.log('Conversion successful:', result);
          const data = {
            _id: result.newObjectId,
            ublId: result.ublId,
            validationId: result.validatorId,
            validationReport: result.validationReport,
            name,
          };
          setXmlFiles((prevXmlFiles) => [...prevXmlFiles, data]);
          addValidatorData(data);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BoardContainer>
      <BoardWrapper>
        <ShowUblBox xmlFiles={xmlFiles} isLoading={isLoading} />
        <UblUploadBox handleUpload={handleUpload} />
      </BoardWrapper>
    </BoardContainer>
  );
};

export default ValidateBoard;
