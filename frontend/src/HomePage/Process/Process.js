import React from 'react';

const Process = () => {
  return (
    <div
      style={{
        marginTop: '106px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 106px)',
      }}>
      <style jsx>{`
        .process-container {
          background-color: #ececfe;
          width: 80%;
          height: 528px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 50px;
          color: black;
        }

        @media only screen and (max-width: 1200px) {
          .process-container {
            width: 90%;
            height: auto;
          }
        }

        @media only screen and (max-width: 768px) {
          .process-container {
            width: auto;
            height: auto;
          }
        }
      `}</style>
      <div className="process-container">
        <div>How it works?</div>
        <div>
          <p>
            lorem-Sunt ad eu cupidatat eu minim. Deserunt pariatur voluptate
            fugiat fugiat proident culpa. Qui labore irure aute laborum ullamco
            commodo esse nisi occaecat officia non. Officia laboris eu
            consectetur ut mollit non sit Lorem fugiat est.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Process;
