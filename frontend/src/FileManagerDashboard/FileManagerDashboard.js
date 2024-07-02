import React from 'react';
import { useParams } from 'react-router-dom';
import useValidatorStore from '../zustand/useValidatorStore';
import { useEffect } from 'react';

const FileManagerDashboard = () => {
  const { process, id } = useParams();
  // const getValidatorDataById = useValidatorStore(
  //   (state) => state.getValidatorDataById
  // );

  const getValidatorData = useValidatorStore((state) => state.getValidatorData);

  useEffect(() => {
    const ans = getValidatorData();
    console.log(ans, 'THIS IS ANSwer');
  });

  return (
    <div>
      FileManagerDashboard{process}
      {id}
    </div>
  );
};
export default FileManagerDashboard;
