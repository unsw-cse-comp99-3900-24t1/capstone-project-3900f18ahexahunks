import React from 'react';
import Button from '@mui/material/Button';

// Custom styled button for primary actions within the application.
const CustomPrimaryButton = ({
  label,
  additionalStyle,
  disabled,
  onClick,
  dataTestid,
}) => {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: '#228be6',
        color: '#ffffff',
        textTransform: 'none',
        fontSize: '15px',
        fontWeight: 500,
        width: '100%',
        height: '40px',
        '&:disabled': {
          color: '#666',
        },
      }}
      style={additionalStyle || {}}
      disabled={disabled}
      onClick={onClick}
      data-testid={dataTestid || ''}
    >
      {label}
    </Button>
  );
};
export default CustomPrimaryButton;
