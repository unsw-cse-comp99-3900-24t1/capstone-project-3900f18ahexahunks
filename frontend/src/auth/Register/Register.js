import { styled } from '@mui/system';
import signUpImage from './register.jpg'; // Adjust the path as necessary

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
});

const Register = () => {
  return (
    <BackgroundContainer>
      <Container></Container>
    </BackgroundContainer>
  );
};
export default Register;
