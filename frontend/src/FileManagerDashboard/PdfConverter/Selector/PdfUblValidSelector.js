import React from 'react';
import SelectorLogo from '../../../components/SelectorLogo';
import AllSelectors from './AllSelectors';

const PdfUblValidSelector = () => {
  return (
    <div style={{ height: '80%' }}>
      <SelectorLogo link={`/dashboard/main`} />
      <AllSelectors />
    </div>
  );
};
export default PdfUblValidSelector;
