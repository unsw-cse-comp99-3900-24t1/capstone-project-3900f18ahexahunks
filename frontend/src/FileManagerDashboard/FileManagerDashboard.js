import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useValidatorStore from '../zustand/useValidatorStore';
import { useEffect } from 'react';
import useUserStore from '../zustand/useUserStore';
import { styled } from '@mui/system';
import UblValidBoard from './UblValidation/MainBoard/UblValidBoard';
import UblValidSelector from './UblValidation/Selector/UblValidSelector';

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

const FileManagerDashboard = () => {
  const { process, id } = useParams();
  const [user, setUser] = useState({});

  const getValidatorData = useValidatorStore((state) => state.getValidatorData);
  const getUser = useUserStore((state) => state.getUser);

  useEffect(() => {
    const ans = getValidatorData();
    const getUserData = getUser();
    setUser(getUserData);
    console.log(ans, 'THIS IS ANSwer', getUserData);
  }, []);

  let content;
  let selector;
  switch (process) {
    case 'validation-reports':
      content = <UblValidBoard />;
      selector = <UblValidSelector />;
      break;
    case 'conversion-reports':
      content = <></>;
      selector = <></>;
      break;
    default:
      content = <></>;
      selector = <></>;
  }

  return (
    <Container>
      <Container1>{selector}</Container1>
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
            {user.username}
          </p>
        </HeaderContainer>
        <div>{content}</div>
      </Container2>
    </Container>
  );
};
export default FileManagerDashboard;
