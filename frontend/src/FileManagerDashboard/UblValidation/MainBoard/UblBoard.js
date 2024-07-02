import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useValidatorStore from '../../../zustand/useValidatorStore';
import { styled } from '@mui/material/styles';
import { getAnyFile } from '../../../services/api';
import useUserStore from '../../../zustand/useUserStore';
import Button from '@mui/material/Button';

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

const UblBoard = () => {
  const { id } = useParams();
  const [xmlData, setXmlData] = useState(null);
  const getValidatorDataById = useValidatorStore(
    (state) => state.getValidatorDataById
  );
  const setLatestData = useValidatorStore((state) => state.setLatestData);

  const { getUser } = useUserStore();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = getValidatorDataById(id);

        console.log('CAME HERE');
        const file = await getAnyFile({ fileId: data.ublId });
        console.log(file);
        console.log(typeof file);

        const fileString =
          typeof file === 'string' ? file : new TextDecoder().decode(file);
        setXmlData(fileString);
      } catch (error) {
        console.error('An unexpected error occurred:', error);
        console.log(
          'An unexpected error occurred while fetching initial XML files. Please try again later.',
          'tomato'
        );
      }
    }

    fetchData();
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={downloadXml}
            style={{ marginTop: '20px', position: 'sticky', top: '0' }}
          >
            Download XML
          </Button>
          <h1>XML Data</h1>
          <div>{renderXml(parseXml(xmlData))}</div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </BoardContainer>
  );
};

export default UblBoard;
