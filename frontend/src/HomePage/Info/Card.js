// import React from 'react';
// const Card = ({ bgColour, file, text, para }) => {
//   return (
//     <div
//       style={{
//         backgroundColor: `${bgColour}`,
//         width: '40%',
//         height: '688px',
//         borderRadius: '24px',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'flex-end',
//         gap: '50px',
//       }}>
//       <div>
//         <p
//           style={{
//             color: '#651FFF',
//             fontSize: '42px',
//             fontFamily: 'Adamina, serif',
//             fontWeight: '400',
//             letterSpacing: '0px',
//             textAlign: 'center',
//           }}>
//           {text}
//         </p>
//         <p
//           style={{
//             textAlign: 'center',
//             color: '#838696',
//           }}>
//           {para}
//         </p>
//       </div>
//       <div style={{ textAlign: 'center' }}>
//         <img
//           style={{ width: '80%' }}
//           src={`${process.env.PUBLIC_URL}/${file}`}
//           alt="logo"
//         />
//       </div>
//     </div>
//   );
// };
// export default Card;

import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ bgColour, file, text, para }) => {
  return (
    <motion.div
      style={{
        backgroundColor: `${bgColour}`,
        width: '90vw',
        height: '80vw',
        maxWidth: '400px',
        maxHeight: '400px',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        gap: '5vw',
        padding: '2vw',
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}>
      <div>
        <p
          style={{
            color: '#651FFF',
            fontSize: '4vw',
            fontFamily: 'Adamina, serif',
            fontWeight: '400',
            letterSpacing: '0px',
            textAlign: 'center',
          }}>
          {text}
        </p>
        <p
          style={{
            textAlign: 'center',
            color: '#838696',
          }}>
          {para}
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <img
          style={{ width: '80%' }}
          src={`${process.env.PUBLIC_URL}/${file}`}
          alt="logo"
        />
      </div>
    </motion.div>
  );
};

export default Card;
