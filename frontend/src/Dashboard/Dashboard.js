import React, { useState } from 'react';
import { styled, useTheme } from '@mui/system';
import { useMediaQuery, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Selector from './Selector/Selector';
import Board from './MainBoard/Board';
import { useParams } from 'react-router-dom';
import PdfUploadBoard from './MainBoard/PdfUpload/PdfUploadBoard';
import ValidateBoard from './MainBoard/ValidateBoard/ValidateBoard';
import useUserStore from '../zustand/useUserStore';
import SettingsBoard from './Settings/SettingsBoard';
import HelpBoard from './Help/HelpBoard';
import ProfileBoard from './Profile/ProfileBoard';

const Container = styled('div')(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
}));

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  width: '240px',
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: '240px',
    boxSizing: 'border-box',
  },
}));

const HeaderContainer = styled('div')(({ theme }) => ({
  height: '10vh',
  width: '80%',
  display: 'flex',
  alignItems: 'center',
  padding: '0 20px',
  justifyContent: 'right',

  '@media (max-width: 1200px)': {
    justifyContent: 'space-between',
    right: '10%',
  },
}));

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [drawerOpen, setDrawerOpen] = useState(false);
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
      {isMobile ? (
        <>
          <DrawerContainer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Selector />
          </DrawerContainer>
        </>
      ) : (
        <div style={{ width: '20%', backgroundColor: '#ffffff' }}>
          <Selector />
        </div>
      )}
      <div
        style={{ width: isMobile ? '100%' : '80%', backgroundColor: '#F9F9F9' }}
      >
        <HeaderContainer>
          {isMobile && (
            <IconButton onClick={() => setDrawerOpen(!drawerOpen)}>
              <MenuIcon />
            </IconButton>
          )}
          <p
            style={{
              fontWeight: '900',
              fontSize: '14px',
              fontFamily: 'Almarai, serif',
              alignText: 'right',
            }}
          >
            {username}
          </p>
        </HeaderContainer>
        <div>{content}</div>
      </div>
    </Container>
  );
};

export default Dashboard;
