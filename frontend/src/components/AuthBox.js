import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/system';

// Styled wrapper for authentication related components.
const BoxWrapper = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1864ab',
});

// Container component to hold and style authentication forms.
const AuthBox = (props) => {
  return (
    <BoxWrapper data-testid="box-wrapper">
      <Box
        sx={{
          width: 700,
          bgcolor: '#222',
          borderRadius: '5px',
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: '25px',
        }}
        data-testid="box"
      >
        {props.children}
      </Box>
    </BoxWrapper>
  );
};
export default AuthBox;
