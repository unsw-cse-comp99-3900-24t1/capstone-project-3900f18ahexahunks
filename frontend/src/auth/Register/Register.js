import { styled } from '@mui/system';
import signUpImage from './register.jpg'; // Adjust the path as necessary

const Container = styled('div')({
  backgroundImage: `url(${signUpImage})`,
  backgroundSize: 'cover', // This ensures the image covers the entire container
  backgroundPosition: 'center', // This centers the image
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const Register = () => {
  return <Container>Register</Container>;
};
export default Register;
