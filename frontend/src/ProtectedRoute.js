// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

// const ProtectedRoute = ({ children }) => {
//   const token = Cookies.get('token');

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// export default ProtectedRoute;

// // THIS ALSO WORKS
// import React, { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// // import { initializeStore } from './zustandStore/usePresentationListStore';
// import Cookies from 'js-cookie';

// // A component that guards child components, ensuring the user is authenticated and store is initialized.
// const ProtectedRoute = ({ children }) => {
//   const [isInitialized, setIsInitialized] = React.useState(false); // State to track if the store has been initialized.

//   const token = Cookies.get('token'); // Retrieve authentication token from local storage.

//   console.log(token);

//   // If no token is found, redirect to login page.
//   if (token == null || token === '') {
//     return <Navigate to="/login" />;
//   }

//   // Effect to initialize the store and set 'isInitialized' to true once done.
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   useEffect(() => {
//     const initializeAndAuthenticate = async () => {
//       // await initializeStore(); // Calls the function to initialize the store.
//       setIsInitialized(true); // Set the initialized state to true.
//     };

//     initializeAndAuthenticate();
//   }, []); // The empty dependency array ensures this effect runs only once after the initial render.

//   // Render a loading message while the store is being initialized.
//   if (!isInitialized) {
//     return <div>Loading...</div>;
//   }
//   // Render the children components once the store is initialized and the user is authenticated.
//   return children;
// };

// export default ProtectedRoute;
