import React from 'react';
import { styled } from '@mui/system';

// Styled container for range input components.
const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  marginTop: '30px',
});

// Styled label for slider component.
const SliderLabel = styled('label')({
  color: '#a5d8ff',
  textTransform: 'uppercase',
  fontWeight: '600',
  fontSize: '16px',
  margin: '0',
});

// Styled input for slider.
const SliderInput = styled('input')({
  width: '100%',
  cursor: 'pointer',
  margin: '0',
});

// Displays the current value of the slider.
const SliderValue = styled('span')({
  color: '#dcddde',
  fontSize: '16px',
  margin: '0',
});

// Combines range input with label and displays the current value.
const InputLabelRange = ({
  customeStyle,
  sign,
  min,
  max,
  label,
  value,
  setValue,
}) => {
  return (
    <Wrapper style={customeStyle}>
      <SliderLabel>{label}</SliderLabel>
      <SliderInput
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <SliderValue>
        {value}
        {sign}
      </SliderValue>
    </Wrapper>
  );
};

export default InputLabelRange;
