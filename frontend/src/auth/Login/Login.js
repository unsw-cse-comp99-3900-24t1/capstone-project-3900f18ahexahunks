import React from 'react';
import { styled } from '@mui/system';
import signUpImage from './login.jpg';
import LoginInputs from './LoginInputs';

const BackgroundContainer = styled('div')({
  backgroundImage: `url(${signUpImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100%',
  height: '100vh',
  position: 'relative',
});

const Container = styled('div')({
  width: '450px',
  height: '658px',
  backgroundColor: '#FFFFFF',
  position: 'absolute',
  bottom: '0',
  right: '16%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const Login = () => {
  return (
    <BackgroundContainer>
      <Container>
        <LoginInputs />
      </Container>
    </BackgroundContainer>
  );
};

export default Login;
