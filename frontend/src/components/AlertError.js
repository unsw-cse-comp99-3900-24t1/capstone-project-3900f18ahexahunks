import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

// Creating a context for the alert system
const AlertContext = createContext();

// This is a styled SnackbarContent component to customize its appearance
const StyledSnackbarContent = styled(SnackbarContent)(
  ({ theme, bgcolor2 }) => ({
    backgroundColor: bgcolor2 || theme.palette.primary.main,
  })
);

// Custom hook to use the alert context
export const useAlert = () => useContext(AlertContext);

// This is the provider component that wraps around parts of the app that need alerts
export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    bgColor2: 'default',
  });

  // Function to show an alert with a message and optional background color
  const showAlert = (message, bgColor2 = 'default') => {
    setAlertState({
      open: true,
      message,
      bgColor2,
    });
  };

  // Function to handle closing the alert
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {/* Snackbar component to display the alert */}
      <Snackbar
        open={alertState.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledSnackbarContent
          bgcolor2={alertState.bgColor2}
          message={<span id="client-snackbar">{alertState.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon style={{ color: '#fff' }} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    </AlertContext.Provider>
  );
};
