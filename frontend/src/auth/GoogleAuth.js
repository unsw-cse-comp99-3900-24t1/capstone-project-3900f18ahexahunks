import React from 'react';
import { Button, styled } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect } from 'react';
import { fetchGoogleUserInfo, googleLoginBackend } from '../services/api';
import { useAlert } from '../components/AlertError';
import useUserStore from '../zustand/useUserStore';

const StyledContainer = styled('div')({
  textAlign: 'center',
  width: '100%',
});

const StyledGoogleButton = styled(Button)({
  backgroundColor: 'white',
  color: 'rgba(0, 0, 0, 0.54)',
  boxShadow: '0 1px 3px 1px rgba(0, 0, 0, 0.25)',
  border: '1px solid rgba(0, 0, 0, 0.12)',
  padding: '8px 24px',
  textTransform: 'none',
  fontSize: '14px',
  lineHeight: '36px',
  width: '100%',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
});

const GoogleAuth = ({ setNewUser, newUser, goToDashboard }) => {
  const { showAlert } = useAlert();
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (newUser) {
          const userInfo = await fetchGoogleUserInfo(newUser.access_token);
          const response = await googleLoginBackend({
            googleId: userInfo.id,
            email: userInfo.email,
            username: userInfo.name, //googleName
            googlePicture: userInfo.picture,
          });
          if (response.error) {
            showAlert(response.data, 'tomato');
          } else {
            showAlert(`Welcome ${userInfo.name}`, 'green');
            console.log(response.data, 'HULAHULA');
            setUser({ user: response.data });
            goToDashboard();
          }
          console.log('Google User Info:', userInfo);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        showAlert('Error fetching user data', 'error');
      }
    };

    console.log(newUser, 'NEWUSER RIGHT NOW');
    if (newUser && newUser.length !== 0) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newUser]);
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setNewUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  return (
    <div>
      <StyledContainer>
        <StyledGoogleButton variant="contained" onClick={login}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThtDY3lQL0z3nfknrcD16ZxHe9BGCj-MlTGQ&s"
            alt="Google G Logo"
            style={{ marginRight: '16px', height: '20px' }}
          />
          Sign in with Google
        </StyledGoogleButton>
      </StyledContainer>
    </div>
  );
};
export default GoogleAuth;
