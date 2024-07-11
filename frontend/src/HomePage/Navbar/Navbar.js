import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const Navbar = () => {
  const nav = useNavigate();

  const goToRegister = () => {
    nav('/register');
  };

  const goToLogin = () => {
    nav('/login');
  };

  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', boxShadow: 'none' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <LogoContainer>
          <img
            src={`${process.env.PUBLIC_URL}/logo.png`}
            alt="NavBarLogo"
            style={{ height: '50px' }}
          />
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography variant="h4" component="div" sx={{ margin: 0 }}>
              HexaHunks
            </Typography>
            <Typography variant="subtitle2" component="div" sx={{ margin: 0 }}>
              Experience Hexa-Growth...
            </Typography>
          </Box>
        </LogoContainer>
        <Box sx={{ display: 'flex', gap: '20px' }}>
          <Button
            variant="contained"
            onClick={goToLogin}
            sx={{ bgcolor: '#ffffff', color: '#000' }}>
            Sign In
          </Button>
          <Button
            variant="contained"
            onClick={goToRegister}
            sx={{ bgcolor: '#651FFF', color: '#ffffff' }}>
            Create an Account
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
