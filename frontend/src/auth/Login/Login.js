import { styled } from '@mui/system';
import signUpImage from './Sign-Up.jpg'; // Adjust the path as necessary

const Container = styled('div')({
  backgroundImage: `url(${signUpImage})`,
  backgroundSize: 'cover', // This ensures the image covers the entire container
  backgroundPosition: 'center', // This centers the image
  width: '100%',
  height: '100vh',
  display: 'flex',
});

const Login = () => {
  return <Container>Login</Container>;
};
export default Login;
