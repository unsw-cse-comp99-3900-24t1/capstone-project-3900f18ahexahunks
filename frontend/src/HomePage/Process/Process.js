// // // // import React from 'react';
// // // // const Process = () => {
// // // //   return (
// // // //     <div style={{ marginTop: '106px' }}>
// // // //       <div>process</div>
// // // //       <div></div>
// // // //     </div>
// // // //   );
// // // // };
// // // // export default Process;

// // // import React from 'react';

// // // // Individual Process Step Component
// // // const ProcessStep = ({ icon, title, description }) => {
// // //   return (
// // //     <div
// // //       style={{
// // //         display: 'flex',
// // //         flexDirection: 'column',
// // //         alignItems: 'center',
// // //         padding: '20px',
// // //       }}>
// // //       <div style={{ marginBottom: '10px' }}>
// // //         {icon} {/* Icon placeholder */}
// // //       </div>
// // //       <h2 style={{ marginBottom: '5px' }}>{title}</h2>
// // //       <p>{description}</p>
// // //     </div>
// // //   );
// // // };

// // // // Main Process Layout Component
// // // const ProcessLayout = () => {
// // //   return (
// // //     <div
// // //       style={{
// // //         display: 'flex',
// // //         justifyContent: 'space-around',
// // //         backgroundColor: '#f4f4f4',
// // //         padding: '40px 0',
// // //       }}>
// // //       <ProcessStep
// // //         icon={
// // //           <div
// // //             style={{
// // //               width: '50px',
// // //               height: '50px',
// // //               borderRadius: '50%',
// // //               backgroundColor: '#6200EE',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               color: 'white',
// // //               fontSize: '24px',
// // //             }}>
// // //             👤
// // //           </div>
// // //         }
// // //         title="Create an account"
// // //         description="Create an Hex account and start uploading your files."
// // //       />
// // //       <ProcessStep
// // //         icon={
// // //           <div
// // //             style={{
// // //               width: '50px',
// // //               height: '50px',
// // //               borderRadius: '50%',
// // //               backgroundColor: '#6200EE',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               color: 'white',
// // //               fontSize: '24px',
// // //             }}>
// // //             ⬆️
// // //           </div>
// // //         }
// // //         title="Upload your files"
// // //         description="Your file and encrypted and converted to UBL 2.0"
// // //       />
// // //       <ProcessStep
// // //         icon={
// // //           <div
// // //             style={{
// // //               width: '50px',
// // //               height: '50px',
// // //               borderRadius: '50%',
// // //               backgroundColor: '#6200EE',
// // //               display: 'flex',
// // //               alignItems: 'center',
// // //               justifyContent: 'center',
// // //               color: 'white',
// // //               fontSize: '24px',
// // //             }}>
// // //             ✉️
// // //           </div>
// // //         }
// // //         title="Share file instantly"
// // //         description="Send your file via email or shareable link with password protect and expiration time."
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default ProcessLayout;

// // import React from 'react';

// // // Individual Process Step Component
// // const ProcessStep = ({ icon, title, description }) => {
// //   return (
// //     <div
// //       style={{
// //         display: 'flex',
// //         flexDirection: 'column',
// //         alignItems: 'center',
// //         padding: '20px',
// //         color: 'white',
// //       }}>
// //       <div style={{ marginBottom: '10px' }}>
// //         {icon} {/* Icon placeholder */}
// //       </div>
// //       <h2 style={{ marginBottom: '5px' }}>{title}</h2>
// //       <p>{description}</p>
// //     </div>
// //   );
// // };

// // // Main Process Layout Component
// // const ProcessLayout = () => {
// //   return (
// //     <div
// //       style={{
// //         display: 'flex',
// //         justifyContent: 'space-around',
// //         backgroundColor: 'black',
// //         padding: '40px 0',
// //       }}>
// //       <ProcessStep
// //         icon={
// //           <div
// //             style={{
// //               width: '50px',
// //               height: '50px',
// //               borderRadius: '50%',
// //               backgroundColor: '#6200EE',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               color: 'white',
// //               fontSize: '24px',
// //             }}>
// //             👤
// //           </div>
// //         }
// //         title="Create an account"
// //         description="Create an Hex account and start uploading your files."
// //       />
// //       <ProcessStep
// //         icon={
// //           <div
// //             style={{
// //               width: '50px',
// //               height: '50px',
// //               borderRadius: '50%',
// //               backgroundColor: '#6200EE',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               color: 'white',
// //               fontSize: '24px',
// //             }}>
// //             ⬆️
// //           </div>
// //         }
// //         title="Upload your files"
// //         description="Your file and encrypted and converted to UBL 2.0"
// //       />
// //       <ProcessStep
// //         icon={
// //           <div
// //             style={{
// //               width: '50px',
// //               height: '50px',
// //               borderRadius: '50%',
// //               backgroundColor: '#6200EE',
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               color: 'white',
// //               fontSize: '24px',
// //             }}>
// //             ✉️
// //           </div>
// //         }
// //         title="Share file instantly"
// //         description="Send your file via email or shareable link with password protect and expiration time."
// //       />
// //     </div>
// //   );
// // };

// // export default ProcessLayout;

// import React from 'react';

// // Individual Process Step Component
// const ProcessStep = ({ icon, title, description }) => {
//   return (
//     <div
//       style={{
//         width: '200px',
//         height: '200px',
//         border: '2px solid white',
//         perspective: '1000px',
//       }}>
//       <div
//         style={{
//           width: '100%',
//           height: '100%',
//           position: 'relative',
//           transformStyle: 'preserve-3d',
//           transition: 'transform 0.6s',
//         }}>
//         <div
//           style={{
//             position: 'absolute',
//             width: '100%',
//             height: '100%',
//             textAlign: 'center',
//             transition: 'transform 0.6s',
//             transformStyle: 'preserve-3d',
//           }}>
//           <div
//             style={{
//               position: 'absolute',
//               width: '100%',
//               height: '100%',
//               backfaceVisibility: 'hidden',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               backgroundColor: '#6200EE',
//             }}>
//             {icon}
//             <h2>{title}</h2>
//           </div>
//           <div
//             style={{
//               position: 'absolute',
//               width: '100%',
//               height: '100%',
//               backfaceVisibility: 'hidden',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               backgroundColor: '#333',
//               transform: 'rotateY(180deg)',
//               padding: '20px',
//             }}>
//             <p>{description}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Hover effect functionality
// const addHoverEffect = (element) => {
//   element.addEventListener('mouseenter', () => {
//     element.style.transform = 'rotateY(180deg)';
//   });
//   element.addEventListener('mouseleave', () => {
//     element.style.transform = 'rotateY(0deg)';
//   });
// };

// // Main Process Layout Component
// const ProcessLayout = () => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'space-around',
//         backgroundColor: 'black',
//         padding: '40px 0',
//       }}>
//       <ProcessStep
//         icon={
//           <div
//             style={{
//               width: '50px',
//               height: '50px',
//               borderRadius: '50%',
//               backgroundColor: '#6200EE',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontSize: '24px',
//             }}>
//             👤
//           </div>
//         }
//         title="Create an account"
//         description="Create an Hex account and start uploading your files."
//       />
//       <ProcessStep
//         icon={
//           <div
//             style={{
//               width: '50px',
//               height: '50px',
//               borderRadius: '50%',
//               backgroundColor: '#6200EE',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontSize: '24px',
//             }}>
//             ⬆️
//           </div>
//         }
//         title="Upload your files"
//         description="Your file and encrypted and converted to UBL 2.0"
//       />
//       <ProcessStep
//         icon={
//           <div
//             style={{
//               width: '50px',
//               height: '50px',
//               borderRadius: '50%',
//               backgroundColor: '#6200EE',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontSize: '24px',
//             }}>
//             ✉️
//           </div>
//         }
//         title="Share file instantly"
//         description="Send your file via email or shareable link with password protect and expiration time."
//       />
//     </div>
//   );
// };

// export default ProcessLayout;
