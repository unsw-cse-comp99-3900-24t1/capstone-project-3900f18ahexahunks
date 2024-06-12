import React from 'react';
import { styled } from '@mui/system';

// Wrapper component for text box input with styling.
const Wrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  width: '100%',
});

// Styled label component for text box.
const Label = styled('p')({
  color: '#a5d8ff',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px',
});

// Styled textarea component for multi-line input.
const Input = styled('textarea')({
  flexGrow: 1,
  height: '40px',
  border: '1px solid black',
  borderRadius: '5px',
  color: '#dcddde',
  background: '#35393f',
  margin: 0,
  fontSize: '16px',
  padding: '0 5px',
});

// Combines text box with label, handling value changes.
const TextBoxWithLabel = ({
  value,
  setValue,
  label,
  type,
  placeholder,
  dataTestId,
}) => {
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Wrapper>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={handleValueChange}
        placeholder={placeholder}
        type={type}
        data-testid={dataTestId || ''}
      />
    </Wrapper>
  );
};
export default TextBoxWithLabel;
