import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { getAnyFile } from '../../../services/api';
import useUserStore from '../../../zustand/useUserStore';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../../components/AlertError';

const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '80vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
  boxShadow: theme.shadows[5],
  position: 'relative',
}));

const XmlContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(4),
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  overflow: 'auto',
  maxHeight: '60vh',
  width: '100%',
  wordBreak: 'break-word',
}));

const StickyButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  position: 'sticky',
  top: theme.spacing(2),
  alignSelf: 'flex-end',
  zIndex: 1,
}));

const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  textAlign: 'left',
  marginTop: 0,
}));

const UblBoard = ({ getValidatorDataById, setLatestData }) => {
  const { id } = useParams();
  const [xmlData, setXmlData] = useState(null);
  const { getUser } = useUserStore();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = getValidatorDataById(id);
        console.log('ADSGDIUYWGEIUQYWGEHYQWGEITQWUFEGQWYUEGQWGEU', data);
        if (data === undefined) {
          navigate('/error/not-found');
          return;
        }

        const file = await getAnyFile({ fileId: data.ublId });
        if (file.error) {
          showAlert(
            file.data.error ? file.data.error : 'Error opening the file',
            'tomato'
          );
        } else {
          const fileString =
            typeof file === 'string' ? file : new TextDecoder().decode(file);
          setXmlData(fileString);
        }
      } catch (error) {
        console.error('An unexpected error occurred:', error);
      }
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, getValidatorDataById, getUser, setLatestData]);

  const renderXml = (node) => {
    if (!node) return null;
    if (node.nodeType === Node.TEXT_NODE) {
      return node.nodeValue.trim() ? <span>{node.nodeValue}</span> : null;
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      return (
        <div style={{ marginLeft: '50px' }}>
          <strong>{node.nodeName}:</strong>
          {Array.from(node.childNodes).map((childNode, index) => (
            <div key={index}>{renderXml(childNode)}</div>
          ))}
        </div>
      );
    }
    return null;
  };

  const parseXml = (xmlString) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'application/xml');
    return xmlDoc.documentElement;
  };

  const downloadXml = () => {
    const blob = new Blob([xmlData], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ubl-file.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <BoardContainer>
      {xmlData ? (
        <>
          <StickyButton
            variant="contained"
            color="primary"
            onClick={downloadXml}
          >
            Download XML
          </StickyButton>
          <Title variant="h4">XML Data</Title>
          <XmlContainer>{renderXml(parseXml(xmlData))}</XmlContainer>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
        </Box>
      )}
    </BoardContainer>
  );
};

export default UblBoard;
