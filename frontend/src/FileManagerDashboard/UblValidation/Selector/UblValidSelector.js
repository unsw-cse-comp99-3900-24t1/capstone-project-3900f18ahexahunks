import React from 'react';
import { useParams } from 'react-router-dom';
import SelectorLogo from '../../../components/SelectorLogo';
import AllSelectors from './AllSelectors';

const UblValidSelector = () => {
  const { id } = useParams();

  return (
    <div style={{ height: '80%' }}>
      <SelectorLogo link={`/dashboard/main`} />
      <AllSelectors />
    </div>
  );
};
export default UblValidSelector;
