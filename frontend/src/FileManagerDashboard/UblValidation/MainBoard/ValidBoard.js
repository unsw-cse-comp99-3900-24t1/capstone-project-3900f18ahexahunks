import React, { useEffect, useState } from 'react';
import { getAnyFile } from '../../../services/api';
import useValidatorStore from '../../../zustand/useValidatorStore';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'normal',
  height: '80vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
}));
const ValidBoard = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);
  const getValidatorDataById = useValidatorStore(
    (state) => state.getValidatorDataById
  );

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const data = await getValidatorDataById(id); // Fetch the validator data
        console.log('Validator Data:', data);

        // Fetch the PDF file using getAnyFile
        const arrayBuffer = await getAnyFile({ fileId: data.validatorId });
        console.log('File Response as ArrayBuffer:', arrayBuffer);

        // Convert the response to a Blob
        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [id, getValidatorDataById]);

  return (
    <BoardContainer>
      {pdfUrl ? (
        <iframe
          src={pdfUrl}
          width="100%"
          height="100%"
          style={{ border: 'none' }}
          title="PDF Viewer"
        ></iframe>
      ) : (
        <p>Loading PDF...</p>
      )}
    </BoardContainer>
  );
};

export default ValidBoard;
