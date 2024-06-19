import { styled } from '@mui/system';
import Selector from './Selector/Selector';
import Board from './MainBoard/Board';
import { useParams } from 'react-router-dom';
import PdfUploadBoard from './MainBoard/PdfUpload/PdfUploadBoard';
import ValidateBoard from './MainBoard/ValidateBoard/ValidateBoard';

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
  const { process } = useParams();
  let content;
  switch (process) {
    case 'convert':
      content = <PdfUploadBoard />;
      break;
    case 'validate':
      content = <ValidateBoard />;
      break;
    default:
      content = <Board />;
  }

  // return <div>{content}</div>;
  return (
    <Container>
      <Container1>
        <Selector />
      </Container1>
      <Container2>{content}</Container2>
    </Container>
  );
};
export default Dashboard;
