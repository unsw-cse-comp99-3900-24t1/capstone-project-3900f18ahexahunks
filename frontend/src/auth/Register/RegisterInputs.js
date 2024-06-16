import { useState } from 'react';
import CustomInputBox from '../../components/CustomInputBox';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import RedirectToLogin from './RedirectToLogin';
import { useAlert } from '../../components/AlertError';
import { validateEmail } from '../../shared/validators';

const RegisterInputs = ({ goToDashboard }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const submitRegister = () => {
    if (name === '') {
      showAlert('Name cannot be empty', 'tomato');
      return;
    }
    if (!validateEmail(email)) {
      showAlert('Email is not valid', 'tomato');
      return;
    }
    if (password !== checkPassword) {
      showAlert('Passwords do not match', 'tomato');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      console.log(email, password, name);
      setLoading(false);
      goToDashboard();
    }, 10000);
  };

  return (
    <div
      style={{
        padding: '40px',
        width: '100%',
      }}
    >
      <p style={{ margin: '0', fontSize: '12.8px' }}>LET'S GET YOU STARTED</p>
      <h2
        style={{
          margin: '0',
          fontSize: '25px',
          marginTop: '16px',
          marginBottom: '50px',
        }}
      >
        Create an Account
      </h2>
      <CustomInputBox
        placeholder="Johnson Doe"
        label="Your Name"
        type="text"
        setValue={setName}
        value={name}
      />
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
      <CustomInputBox
        style={{ marginTop: '30px' }}
        placeholder="########"
        label="Password"
        type="password"
        setValue={setCheckPassword}
        value={checkPassword}
      />
      <CustomPrimaryButton
        label="CONTINUE"
        bgcolour="#651FFF"
        additionalStyle={{
          width: '92%',
          height: '50px',
          fontSize: '13px',
        }}
        onClick={submitRegister}
      />

      <RedirectToLogin />

      {loading && <LoadingIndicator />}
    </div>
  );
};
export default RegisterInputs;
