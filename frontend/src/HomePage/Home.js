import { styled } from '@mui/system';
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';

const Container = styled('div')({
  color: '#ffffff',
  backgroundColor: '#000',
  height: '100%',
});

const Home = () => {
  return (
    <Container>
      <Navbar />
      <Hero />
      <div>Home</div>
    </Container>
  );
};
export default Home;
