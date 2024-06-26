import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import SelectorLinks from './SelectorLinks';

const SelectorContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  height: '100%',
  paddingLeft: '20px',
  paddingRight: '20px',
}));

const SelectorContainer1 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const SelectorContainer2 = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
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
      setSelectedRoute('/settings');
    } else if (process === 'help') {
      setSelectedRoute('/help');
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
          routeTo="/settings"
          text="Settings"
          isSelected={selectedRoute === '/settings'}
          onClick={() => setSelectedRoute('/settings')}
        />
      </SelectorContainer1>
      <SelectorContainer2>
        <SelectorLinks
          routeTo="/help"
          text="Help"
          isSelected={selectedRoute === '/help'}
          onClick={() => setSelectedRoute('/help')}
        />
        <button onClick={handleLogout}>Logout</button>
      </SelectorContainer2>
    </SelectorContainer>
  );
};

export default MainSelectors;
