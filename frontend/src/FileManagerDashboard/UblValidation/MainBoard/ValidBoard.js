import React, { useEffect, useState } from 'react';
import { getAnyFile } from '../../../services/api';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
const BoardContainer = styled('div')(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'normal',
  height: '90vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
}));
const ValidBoard = ({ fileId }) => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const arrayBuffer = await getAnyFile({ fileId });
        console.log('File Response as ArrayBuffer:', arrayBuffer);

        const blob = new Blob([arrayBuffer], { type: 'application/pdf' });

        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

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
