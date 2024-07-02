import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useValidatorStore from '../zustand/useValidatorStore';
import { useEffect } from 'react';
import useUserStore from '../zustand/useUserStore';
import { styled } from '@mui/system';
import UblValidSelector from './UblValidation/Selector/UblValidSelector';
import UblBoard from './UblValidation/MainBoard/UblBoard';
import ValidBoard from './UblValidation/MainBoard/ValidBoard';
import HelpBoard from '../Dashboard/Help/HelpBoard';
import ShareFilesBoard from './UblValidation/MainBoard/ShareFilesBoard';

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
  const { process, file, id } = useParams();
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
      selector = <UblValidSelector id={id} />;
      switch (file) {
        case 'ubl':
          content = <UblBoard />;
          break;
        case 'validate':
          content = <ValidBoard />;
          break;
        case 'share':
          content = <ShareFilesBoard />;
          break;
        case 'help':
          content = <HelpBoard />;
          break;
        default:
          content = <></>;
      }
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
