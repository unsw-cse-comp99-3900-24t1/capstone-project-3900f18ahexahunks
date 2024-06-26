import { styled } from '@mui/material/styles';
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
  return (
    <SelectorContainer>
      <SelectorContainer1>
        <SelectorLinks routeTo="/dashboard/main" text="Dashboard" />
        <SelectorLinks routeTo="/dashboard/validate" text="Validate" />
        <SelectorLinks routeTo="/dashboard/conver" text="Invoices" />
        <SelectorLinks routeTo="/settings" text="Settings" />
      </SelectorContainer1>
      <SelectorContainer2>
        <SelectorLinks routeTo="/help" text="Help" />
        <button onClick={handleLogout}>Logout</button>
      </SelectorContainer2>
    </SelectorContainer>
  );
};
export default MainSelectors;
