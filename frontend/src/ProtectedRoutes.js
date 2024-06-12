import React from 'react';
import { Navigate } from 'react-router-dom';
import { initializeStore } from './zustandStore/usePresentationListStore';

// A component that guards child components, ensuring the user is authenticated and store is initialized.
const ProtectedRoute = ({ children }) => {
  const [isInitialized, setIsInitialized] = React.useState(false); // State to track if the store has been initialized.

  const token = localStorage.getItem('token'); // Retrieve authentication token from local storage.

  initializeStore();
  // If no token is found, redirect to login page.
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Effect to initialize the store and set 'isInitialized' to true once done.
  React.useEffect(() => {
    const initializeAndAuthenticate = async () => {
      await initializeStore(); // Calls the function to initialize the store.
      setIsInitialized(true); // Set the initialized state to true.
    };

    initializeAndAuthenticate();
  }, []); // The empty dependency array ensures this effect runs only once after the initial render.

  // Render a loading message while the store is being initialized.
  if (!isInitialized) {
    return <div>Loading...</div>;
  }
  // Render the children components once the store is initialized and the user is authenticated.
  return children;
};

export default ProtectedRoute;
