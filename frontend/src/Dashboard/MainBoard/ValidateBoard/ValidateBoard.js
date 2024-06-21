import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import UploadBox from './UploadBoxXml';
import ShowXml from './ShowXml';
import useUserStore from '../../../zustand/useUserStore';
import { xmlToValidation } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';

const BoardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  padding: '10px',
});

const ValidateBoard = () => {
  const [xmlFiles, setXmlFiles] = useState([]);
  const { getUser } = useUserStore();
  const { showAlert } = useAlert();

  useEffect(() => {
    console.log('GET Request here to get all the old XML files');
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const user = getUser();
    const userId = user._id;

    if (file && file.type === 'text/xml') {
      const fileURL = URL.createObjectURL(file);
      setXmlFiles((prevXmlFiles) => [...prevXmlFiles, fileURL]);

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId); // Append user ID

      const result = await xmlToValidation(formData);
      if (result.error) {
        console.error('Error validating XML:', result.data);
      } else {
        console.log('Validation successful:', result);
      }
    } else {
      showAlert('Error uploading/validating XML', 'tomato');
    }
  };

  return (
    <BoardContainer>
      <ShowXml xmlFiles={xmlFiles} />
      <UploadBox handleUpload={handleUpload} acceptType="text/xml" />
    </BoardContainer>
  );
};

export default ValidateBoard;
