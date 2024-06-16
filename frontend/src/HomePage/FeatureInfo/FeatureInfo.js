import React, { useEffect, useRef, useState } from 'react';

const FeatureInfo = () => {
  const h1Ref = useRef(null);
  const [h1Width, setH1Width] = useState('auto');

  useEffect(() => {
    if (h1Ref.current) {
      setH1Width(`${h1Ref.current.offsetWidth}px`);
    }
  }, [h1Ref]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '134px',
      }}
    >
      <h1
        ref={h1Ref}
        style={{
          fontSize: '48px',
          fontFamily: 'Adamina, serif',
          fontWeight: 'initial',
        }}
      >
        Lightning fast. Better privacy. Fairer cost.
      </h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'space-around',
          width: h1Width,
          marginTop: '57px',
        }}
      >
        <div
          style={{
            height: '100px',
            width: '100px',
            backgroundColor: '#fff',
          }}
        ></div>
        <div
          style={{
            height: '100px',
            width: '100px',
            backgroundColor: '#fff',
          }}
        ></div>
        <div
          style={{
            height: '100px',
            width: '100px',
            backgroundColor: '#fff',
          }}
        ></div>
      </div>
    </div>
  );
};
export default FeatureInfo;
