import { styled } from '@mui/system';
import Selector from './Selector/Selector';
import Board from './MainBoard/Board';

const Container = styled('div')({
  width: ' 100vw',
  height: '100vh',
  display: 'flex',
});

const Container1 = styled('div')({
  width: '20%',
  height: '100vh',
  backgroundColor: '#ffffff',
});
const Container2 = styled('div')({
  width: '80%',
  height: '100vh',
  backgroundColor: '#F9F9F9',
});

const Dashboard = () => {
  return (
    <Container>
      <Container1>
        <Selector />
      </Container1>
      <Container2>
        <Board />
      </Container2>
    </Container>
  );
};
export default Dashboard;
