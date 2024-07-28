import React, { useState } from 'react';
import HtmlValidationBoard from './HtmlValidationBoard';
import ValidBoard from './ValidBoard';
import { ButtonGroup, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import JsonValidationBoard from './JsonValidationBoard';

const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '70vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
  boxShadow: theme.shadows[5],
  position: 'relative',
}));

const SelectorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  // width: '100%',
  marginRight: '10%',
}));

const StyledButton = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected ? '#651FFF' : '#fff',
  color: selected ? '#fff' : '#000',
  '&:hover': {
    backgroundColor: selected ? '#531ecc' : theme.palette.grey[300],
  },
  transition: 'background-color 0.3s ease, color 0.3s ease',
}));

const ValidationSelectors = ({ htmlContent, fileId, jsonContent }) => {
  const [selectedView, setSelectedView] = useState('html');

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  return (
    <div>
      <SelectorContainer>
        <ButtonGroup>
          <StyledButton
            selected={selectedView === 'html'}
            onClick={() => handleViewChange('html')}
          >
            HTML View
          </StyledButton>
          <StyledButton
            selected={selectedView === 'json'}
            onClick={() => handleViewChange('json')}
          >
            JSON View
          </StyledButton>
          <StyledButton
            selected={selectedView === 'pdf'}
            onClick={() => handleViewChange('pdf')}
          >
            PDF View
          </StyledButton>
        </ButtonGroup>
      </SelectorContainer>
      {selectedView === 'html' && (
        <BoardContainer>
          <HtmlValidationBoard htmlContent={htmlContent} />
        </BoardContainer>
      )}
      {selectedView === 'json' && (
        <BoardContainer>
          <JsonValidationBoard jsonContent={jsonContent} />
        </BoardContainer>
      )}
      {selectedView === 'pdf' && (
        <BoardContainer>
          <ValidBoard fileId={fileId} />
        </BoardContainer>
      )}
    </div>
  );
};

export default ValidationSelectors;
