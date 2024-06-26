import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import SelectorLinks from './SelectorLinks';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';

const SelectorContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
  paddingLeft: '20px',
  paddingRight: '20px',
  alignContent: 'center',
}));

const SelectorContainer1 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
}));

const SelectorContainer2 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignContent: 'center',
  alignItems: 'center',
}));

const StyledLogoutButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#999',
  color: '#fff',
  marginTop: '5px',
  width: '150px',
  '&:hover': {
    backgroundColor: '#D50000',
  },
}));

const MainSelectors = ({ handleLogout }) => {
  const { process } = useParams();
  const [selectedRoute, setSelectedRoute] = useState('');

  useEffect(() => {
    if (process === 'main') {
      setSelectedRoute('/dashboard/main');
    } else if (process === 'validate') {
      setSelectedRoute('/dashboard/validate');
    } else if (process === 'convert') {
      setSelectedRoute('/dashboard/convert');
    } else if (process === 'settings') {
      setSelectedRoute('/dashboard/settings');
    } else if (process === 'help') {
      setSelectedRoute('/dashboard/help');
    } else {
      setSelectedRoute('/dashboard/main');
    }
  }, [process]);

  return (
    <SelectorContainer>
      <SelectorContainer1>
        <SelectorLinks
          routeTo="/dashboard/main"
          text="Dashboard"
          isSelected={selectedRoute === '/dashboard/main'}
          onClick={() => setSelectedRoute('/dashboard/main')}
        />
        <SelectorLinks
          routeTo="/dashboard/validate"
          text="Validate"
          isSelected={selectedRoute === '/dashboard/validate'}
          onClick={() => setSelectedRoute('/dashboard/validate')}
        />
        <SelectorLinks
          routeTo="/dashboard/convert"
          text="Invoices"
          isSelected={selectedRoute === '/dashboard/convert'}
          onClick={() => setSelectedRoute('/dashboard/convert')}
        />
        <SelectorLinks
          routeTo="/dashboard/settings"
          text="Settings"
          isSelected={selectedRoute === '/dashboard/settings'}
          onClick={() => setSelectedRoute('/dashboard/settings')}
          additionalStyle={{ marginTop: '50px' }}
        />
      </SelectorContainer1>
      <SelectorContainer2>
        <SelectorLinks
          routeTo="/dashboard/help"
          text="Help"
          isSelected={selectedRoute === '/dashboard/help'}
          onClick={() => setSelectedRoute('/dashboard/help')}
        />
        <StyledLogoutButton
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </StyledLogoutButton>
      </SelectorContainer2>
    </SelectorContainer>
  );
};

export default MainSelectors;
