import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import UblUploadBox from './UblUploadBox';
import ShowUblBox from './ShowUblBox';
import useUserStore from '../../../zustand/useUserStore';
import { getAllValidationUblInfo, validateUBL } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';
import useValidatorStore from '../../../zustand/useValidatorStore';
import CustomInputBox from '../../../components/CustomInputBox';

// This is the styling for the board container
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

// This is the wrapper for arranging the board content in a grid layout
const BoardWrapper = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  padding: '10px',
  width: '100%',
});

const Container = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  '@media (max-width: 750px)': {
    width: '90%',
  },
});

// Main component for keeping the record of validations of XMLs (UBL)
const ValidateBoard = () => {
  const [xmlFiles, setXmlFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');

  const { getUser } = useUserStore();
  const { showAlert } = useAlert();

  const addValidatorData = useValidatorStore((state) => state.addValidatorData);
  const setLatestData = useValidatorStore((state) => state.setLatestData);

  // Gets the latest file storage from the db for all the ids and stuff
  useEffect(() => {
    const fetchInitialXmlFiles = async () => {
      try {
        // Gets user data
        const user = getUser();
        const userId = user._id;

        // Sends request to get the latest validation data
        const result = await getAllValidationUblInfo({ userId });
        if (result.error) {
          showAlert(
            result.data.error
              ? result.data.error
              : 'Error fetching initial XML files',
            'tomato'
          );
        } else {
          // Sets the latest data to zustand and state
          setXmlFiles(result);
          setLatestData(result);
        }
      } catch (error) {
        // Error handling
        showAlert(
          'An unexpected error occurred while fetching initial XML files. Please try again later.',
          'tomato'
        );
      }
    };

    fetchInitialXmlFiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser, setLatestData]);

  // To handle upload of the latest XML and send for processing in backend
  const handleUpload = async (file, name) => {
    // Start loading so that user knows something is working in the backend
    setIsLoading(true);
    try {
      // Get user data
      const user = getUser();
      const userId = user._id;

      // Confirm file is of type XML
      if (file && file.type === 'text/xml') {
        // Create file data to send to backend
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', userId);
        formData.append('name', name);

        // Finally send the data to backend for processing
        const result = await validateUBL(formData);
        console.log(result);

        if (result.error) {
          showAlert(
            result.data?.error
              ? result.data.error
              : 'Error converting/uploading PDF',
            'tomato'
          );
        } else {
          showAlert('UBL successfully validated', 'green');

          // On success save the new UBL data to zustand and the state
          const data = {
            _id: result.newObjectId,
            ublId: result.ublId,
            validationId: result.validatorId,
            validationHtml: result.validationHtml,
            validationJson: result.validationJson,
            date: result.date,
            name,
          };
          setXmlFiles((prevXmlFiles) => [...prevXmlFiles, data]);
          addValidatorData(data);
        }
      } else {
        showAlert('Invalid file type. Please upload an XML file.', 'tomato');
      }
    } catch (error) {
      // Error handling
      console.error('An unexpected error occurred:', error);
      showAlert(
        'An unexpected error occurred. Please try again later.',
        'tomato'
      );
    } finally {
      // Close loading
      setIsLoading(false);
    }
  };

  console.log(xmlFiles);

  // Here, we return the JSX for rendering the validation board
  return (
    <BoardContainer>
      <Container>
        <CustomInputBox
          value={searchTerm}
          setValue={setSearchTerm}
          label="Search Files"
          placeholder="Search for files by name"
        />
      </Container>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          style={{
            marginRight: '10px',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
      </div>
      <BoardWrapper>
        <ShowUblBox
          isLoading={isLoading}
          searchTerm={searchTerm}
          filterDate={filterDate}
        />
        <UblUploadBox handleUpload={handleUpload} />
      </BoardWrapper>
    </BoardContainer>
  );
};

export default ValidateBoard;
