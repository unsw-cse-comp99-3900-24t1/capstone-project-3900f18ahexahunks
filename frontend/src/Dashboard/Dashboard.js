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
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useState } from 'react';
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

// const UsernameContainer = styled('div')({
//   display: 'flex',
//   alignItems: 'center',
//   cursor: 'pointer',
// });

const Dashboard = () => {
  const { getUser } = useUserStore();
  const username = getUser().username;
  const { process } = useParams();
  // const [anchorEl, setAnchorEl] = useState(null);
  // const nav = useNavigate();

  // const handleMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleMenuClose = () => {
  //   nav('/dashboard/profile');
  //   setAnchorEl(null);
  // };

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
          {/* <UsernameContainer onClick={handleMenuOpen}> */}
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
          {/* <IconButton>
              <AccountCircleIcon fontSize="large" />
            </IconButton>
          </UsernameContainer>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Menu> */}
        </HeaderContainer>
        <div>{content}</div>
      </Container2>
    </Container>
  );
};

export default Dashboard;
