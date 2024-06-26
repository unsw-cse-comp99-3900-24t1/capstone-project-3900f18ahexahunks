import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import UploadBox from './UploadBox';
import ShowPdf from './ShowPdf';
import useUserStore from '../../../zustand/useUserStore';
import { pdfToUblConvert } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';

const BoardContainer = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '10px',
  padding: '10px',
});

const PdfUploadBoard = () => {
  const [pdfs, setPdfs] = useState([]);
  const { getUser } = useUserStore();
  const { showAlert } = useAlert();

  useEffect(() => {
    console.log('GET Request here to get all the old pdfs');
  }, []);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    const user = getUser();
    const userId = user._id;

    if (file && file.type === 'application/pdf') {
      const fileURL = URL.createObjectURL(file);
      setPdfs((prevPdfs) => [...prevPdfs, fileURL]);

      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);
      formData.append('userId', userId); // Append user ID

      const result = await pdfToUblConvert(formData);
      if (result.error) {
        console.error('Error converting PDF to UBL:', result.data);
      } else {
        console.log('Conversion successful:', result);
      }
    } else {
      showAlert('Error converting/uploading PDF', 'tomato');
    }
  };

  return (
    <BoardContainer>
      <ShowPdf pdfs={pdfs} />
      <UploadBox handleUpload={handleUpload} />
    </BoardContainer>
  );
};

export default PdfUploadBoard;
