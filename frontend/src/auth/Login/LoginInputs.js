import { useState } from 'react';
import CustomInputBox from '../../components/CustomInputBox';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import ForgotPassword from './ForgotPassword';
import RedirectToRegister from './RedirectToRegister';
import validator from 'validator';
import { useAlert } from '../../components/AlertError';

const LoginInputs = ({ goToDashboard }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const submitLogin = () => {
    setLoading(true);
    if (!validator.isEmail(email)) {
      showAlert('Email is not valid', 'tomato');
      return;
    }
    // Simulate a login request delay
    setTimeout(() => {
      console.log(email, password);
      setLoading(false);
      goToDashboard();
    }, 10000); // 2 seconds delay to simulate the request
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
      />
      <CustomInputBox
        style={{ marginTop: '30px' }}
        placeholder="########"
        label="Password"
        type="password"
        setValue={setPassword}
        value={password}
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
        onClick={submitLogin}
      />

      <RedirectToRegister />

      {loading && <LoadingIndicator />}
    </div>
  );
};
export default LoginInputs;
