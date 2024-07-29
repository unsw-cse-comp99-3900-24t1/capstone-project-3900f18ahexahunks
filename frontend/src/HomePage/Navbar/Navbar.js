import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import Cookies from 'js-cookie';

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const NavbarContainer = styled(AppBar)(({ isScrolled }) => ({
  backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.5)' : '#000',
  boxShadow: 'none',
  transition: 'background-color 0.3s ease-in-out',
  padding: '10px 50px',
}));

const ToolbarContainer = styled(Toolbar)({
  justifyContent: 'space-between',
});

const CustomBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = Cookies.get('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      setUser(JSON.parse(userData).user);
    }
  }, []);

  const goToRegister = () => {
    nav('/register');
  };

  const goToLogin = () => {
    nav('/login');
  };

  const goToDashboard = () => {
    nav('/dashboard/main');
  };

  return (
    <NavbarContainer position="sticky" isScrolled={isScrolled}>
      <Container>
        <ToolbarContainer>
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
              <Typography
                variant="subtitle2"
                component="div"
                sx={{ margin: 0 }}
              >
                Experience Hexa-Growth...
              </Typography>
            </Box>
          </LogoContainer>
          <CustomBox>
            {user ? (
              <>
                <Typography variant="h6" sx={{ fontSize: '20px' }}>
                  Welcome, {user.username}
                </Typography>
                <CustomPrimaryButton
                  label="Try Now"
                  onClick={goToDashboard}
                  bgcolour="#651FFF"
                  additionalStyle={{ width: 'fit-content' }}
                />
              </>
            ) : (
              <>
                <CustomPrimaryButton
                  label="Sign In"
                  onClick={goToLogin}
                  bgcolour="#ffffff"
                  additionalStyle={{ width: 'fit-content' }}
                />
                <CustomPrimaryButton
                  label="Create an account"
                  onClick={goToRegister}
                  bgcolour="#651FFF"
                  additionalStyle={{ width: 'fit-content' }}
                />
              </>
            )}
          </CustomBox>
        </ToolbarContainer>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
