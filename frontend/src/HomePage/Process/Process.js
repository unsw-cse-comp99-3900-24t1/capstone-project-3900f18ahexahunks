// import React from 'react';

// const Process = () => {
//   return (
//     <div
//       style={{
//         marginTop: '106px',
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         minHeight: 'calc(100vh - 106px)',
//       }}>
//       <style jsx>{`
//         .process-container {
//           background-color: #ececfe;
//           width: 80%;
//           height: 528px;
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
//           padding: 20px;
//           border-radius: 50px;
//           color: black;
//         }

//         @media only screen and (max-width: 1200px) {
//           .process-container {
//             width: 90%;
//             height: auto;
//           }
//         }

//         @media only screen and (max-width: 768px) {
//           .process-container {
//             width: auto;
//             height: auto;
//           }
//         }
//       `}</style>
//       <div className="process-container">
//         <h1>How it works?</h1>
//         <h3>
//           lorem-Sunt ad eu cupidatat eu minim. Deserunt pariatur voluptate
//           fugiat fugiat proident culpa. Qui labore irure aute laborum ullamco
//           commodo esse nisi occaecat officia non. Officia laboris eu consectetur
//           ut mollit non sit Lorem fugiat est.
//         </h3>
//         <div className="boxes">
//           <div className="box">Box 1</div>
//           <div className="box">Box 2</div>
//           <div className="box">Box 3</div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Process;

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
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          border-radius: 50px;
          color: black;
        }

        .process-container h1,
        .process-container h3 {
          margin: 0;
          text-align: center;
        }

        .process-container h1 {
          margin-bottom: 10px;
        }

        .process-container h3 {
          margin-bottom: 20px;
        }

        .boxes {
          display: flex;
          justify-content: space-around;
          width: 100%;
          flex-grow: 1;
        }

        .box {
          background-color: white;
          width: 30%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          padding: 5px;
          background-color: #d0bdf4;
        }

        @media only screen and (max-width: 1200px) {
          .process-container {
            width: 80%;
            height: auto;
          }

          .box {
            width: 45%;
            margin-bottom: 10px;
          }
        }

        @media only screen and (max-width: 768px) {
          .process-container {
            width: 90%;
            height: auto;
          }

          .boxes {
            flex-direction: column;
            align-items: center;
          }

          .box {
            width: 90%;
            margin-bottom: 10px;
          }
        }
      `}</style>
      <div className="process-container">
        <h1>How it works?</h1>
        <h3>
          lorem-Sunt ad eu cupidatat eu minim. Deserunt pariatur voluptate
          fugiat fugiat proident culpa. Qui labore irure aute laborum ullamco
          commodo esse nisi occaecat officia non. Officia laboris eu consectetur
          ut mollit non sit Lorem fugiat est.
        </h3>
        <div className="boxes">
          <div className="box">
            <h1>Create an account</h1>
            <h3>
              lorenConsectetur magna quis in nulla enim non ad sit ex do commodo
              ex dolore reprehenderit.
            </h3>
          </div>
          <div className="box">
            <h1>Upload your files</h1>
            <h3>
              lorenConsectetur magna quis in nulla enim non ad sit ex do commodo
              ex dolore reprehenderit.
            </h3>
          </div>
          <div className="box">
            <h1>Share the file</h1>
            <h3>
              lorenConsectetur magna quis in nulla enim non ad sit ex do commodo
              ex dolore reprehenderit.
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Process;
