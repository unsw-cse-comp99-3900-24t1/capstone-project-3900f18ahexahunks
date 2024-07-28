// import React, { useEffect, useState } from 'react';
// import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
// import { styled } from '@mui/system';
// import { useNavigate } from 'react-router-dom';
// import CustomPrimaryButton from '../../components/CustomPrimaryButton';

// const LogoContainer = styled(Box)({
//   display: 'flex',
//   alignItems: 'center',
//   gap: '10px',
//   marginTop: '20px',
//   marginBottom: '20px',
// });

// const NavbarContainer = styled(AppBar)(({ isScrolled }) => ({
//   backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.5)' : '#000',
//   boxShadow: 'none',
//   transition: 'background-color 0.3s ease-in-out',
//   padding: '10px 50px',
// }));

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const nav = useNavigate();

//   const handleScroll = () => {
//     if (window.scrollY > 0) {
//       setIsScrolled(true);
//     } else {
//       setIsScrolled(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const goToRegister = () => {
//     nav('/register');
//   };

//   const goToLogin = () => {
//     nav('/login');
//   };

//   return (
//     <NavbarContainer
//       position="sticky" isScrolled={isScrolled}
//     >
//       <Toolbar
//         sx={{
//           justifyContent: 'space-between',
//         }}
//       >
//         <LogoContainer>
//           <img
//             src={`${process.env.PUBLIC_URL}/logo.png`}
//             alt="NavBarLogo"
//             style={{ height: '50px' }}
//           />
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             <Typography variant="h4" component="div" sx={{ margin: 0 }}>
//               HexaHunks
//             </Typography>
//             <Typography variant="subtitle2" component="div" sx={{ margin: 0 }}>
//               Experience Hexa-Growth...
//             </Typography>
//           </Box>
//         </LogoContainer>
//         <Box sx={{ display: 'flex', gap: '20px' }}>
//           <CustomPrimaryButton
//             label="Sign In"
//             onClick={goToLogin}
//             bgcolour="#ffffff"
//             additionalStyle={{ width: 'fit-content' }}
//           />
//           <CustomPrimaryButton
//             label="Create an account"
//             onClick={goToRegister}
//             bgcolour="#651FFF"
//             additionalStyle={{ width: 'fit-content' }}
//           />
//         </Box>
//       </Toolbar>
//     </NavbarContainer>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';

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

  const goToRegister = () => {
    nav('/register');
  };

  const goToLogin = () => {
    nav('/login');
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
          </CustomBox>
        </ToolbarContainer>
      </Container>
    </NavbarContainer>
  );
};

export default Navbar;
