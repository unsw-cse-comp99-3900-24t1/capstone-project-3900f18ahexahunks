import { styled } from '@mui/system';
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import FeatureInfo from './FeatureInfo/FeatureInfo';
import InfoCards from './Info/InfoCards';

const Container = styled('div')({
  color: '#ffffff',
  backgroundColor: '#000',
  height: '100%',
  marginLeft: '50px',
  marginRight: '50px',
  '@media (max-width: 750px)': {
    margin: '0',
  },
});

const Home = () => {
  return (
    <div
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/login.jpg)` }}
    >
      <Container>
        <Navbar />
        <Hero />
        <FeatureInfo />
        <InfoCards />
        <div>Home</div>
      </Container>
    </div>
  );
};
export default Home;
