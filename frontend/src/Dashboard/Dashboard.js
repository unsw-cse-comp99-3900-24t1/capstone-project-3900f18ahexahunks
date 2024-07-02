import React from 'react';
import { styled } from '@mui/system';
import Selector from './Selector/Selector';
import Board from './MainBoard/Board';
import { useParams } from 'react-router-dom';
import PdfUploadBoard from './MainBoard/PdfUpload/PdfUploadBoard';
import ValidateBoard from './MainBoard/ValidateBoard/ValidateBoard';
import useUserStore from '../zustand/useUserStore';
import SettingsBoard from './Settings/SettingsBoard';
import HelpBoard from './Help/HelpBoard';
import ProfileBoard from './Profile/ProfileBoard';

const Container = styled('div')({
  width: '100vw',
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

const HeaderContainer = styled('div')({
  height: '10vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'right',
  paddingRight: '20%',
});

const Dashboard = () => {
  const { getUser } = useUserStore();
  const username = getUser().username;
  const { process } = useParams();

  let content;
  switch (process) {
    case 'convert':
      content = <PdfUploadBoard />;
      break;
    case 'validate':
      content = <ValidateBoard />;
      break;
    case 'settings':
      content = <SettingsBoard />;
      break;
    case 'help':
      content = <HelpBoard />;
      break;
    case 'profile':
      content = <ProfileBoard />;
      break;
    case 'main':
      content = <Board />;
      break;
    default:
      content = <></>;
  }

  return (
    <Container>
      <Container1>
        <Selector />
      </Container1>
      <Container2>
        <HeaderContainer>
          <p
            style={{
              fontWeight: '900',
              fontSize: '14px',
              fontFamily: 'Almarai, serif',
              paddingRight: '20%',
            }}
          >
            {username}
          </p>
        </HeaderContainer>
        <div>{content}</div>
      </Container2>
    </Container>
  );
};

export default Dashboard;
