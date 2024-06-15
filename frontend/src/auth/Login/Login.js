import React from 'react';
import { styled } from '@mui/system';
import signUpImage from './login.jpg';
import LoginInputs from './LoginInputs';
import LoginText from './LoginText';

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
  borderRadius: '24px 24px 0 0',
  '@media (max-width: 1400px)': {
    right: '10%',
  },
  '@media (max-width: 1150px)': {
    right: '4%',
  },
  '@media (max-width: 980px)': {
    right: '1%',
  },
  '@media (max-width: 890px)': {
    left: '50%',
    transform: 'translateX(-50%)',
  },
});

const Container2 = styled('div')({
  width: '450px',
  height: '658px',
  position: 'absolute',
  left: '16%',
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 1400px)': {
    left: '10%',
  },
  '@media (max-width: 1150px)': {
    left: '4%',
  },
  '@media (max-width: 980px)': {
    left: '0%',
  },
  '@media (max-width: 890px)': {
    display: 'none',
  },
});

const Login = () => {
  return (
    <BackgroundContainer>
      <Container2>
        <LoginText />
      </Container2>
      <Container>
        <LoginInputs />
      </Container>
    </BackgroundContainer>
  );
};

export default Login;
