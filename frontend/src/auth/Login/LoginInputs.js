import React, { useEffect } from 'react';
import { useState } from 'react';
import CustomInputBox from '../../components/CustomInputBox';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import ForgotPassword from './ForgotPassword';
import RedirectToRegister from './RedirectToRegister';
import { useAlert } from '../../components/AlertError';
import { login } from '../../services/api';
import useUserStore from '../../zustand/useUserStore';
import GoogleAuth from '../GoogleAuth';

const LoginInputs = ({ goToDashboard }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const { setUser, getUser } = useUserStore();
  const [newUser, setNewUser] = useState([]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await login({ email, password });
      if (response.error) {
        showAlert(response.data, 'tomato');
      } else {
        showAlert('Welcome back', 'green');
        console.log(response.data, 'THIS IS LOL');
        setUser({ user: response.data });
        console.log(getUser(), 'TISI IS THE FROM STORE');
        goToDashboard();
      }
    } catch (e) {
      showAlert('An unexpected error occurred.', 'tomato');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin(e);
    }
  };

  return (
    <div
      style={{
        padding: '40px',
        width: '100%',
      }}
    >
      <p style={{ margin: '0', fontSize: '12.8px' }}>WELCOME BACK</p>
      <h2
        style={{
          margin: '0',
          fontSize: '25px',
          marginTop: '16px',
          marginBottom: '50px',
        }}
      >
        Log In to your Account
      </h2>
      <CustomInputBox
        placeholder="johnsondoe@nomail.com"
        label="Email"
        type="text"
        setValue={setEmail}
        value={email}
        onKeyDown={handleKeyDown}
        data-testid={'login-email'}
      />
      <CustomInputBox
        style={{ marginTop: '30px' }}
        placeholder="########"
        label="Password"
        type="password"
        setValue={setPassword}
        value={password}
        onKeyDown={handleKeyDown}
        data-testid={'login-password'}
      />
      <ForgotPassword />
      <CustomPrimaryButton
        label="CONTINUE"
        bgcolour="#651FFF"
        additionalStyle={{
          width: '92%',
          height: '50px',
          fontSize: '13px',
        }}
        onClick={handleLogin}
        dataTestid={'login-submit'}
      />

      <RedirectToRegister />
      <div style={{ marginTop: '30px' }}>
        <GoogleAuth
          setNewUser={setNewUser}
          newUser={newUser}
          goToDashboard={goToDashboard}
        />
      </div>

      {loading && <LoadingIndicator />}
    </div>
  );
};
export default LoginInputs;
