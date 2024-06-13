// import React, { createContext, useContext, useState } from 'react';
// import Snackbar from '@mui/material/Snackbar';
// import SnackbarContent from '@mui/material/SnackbarContent';
// import CloseIcon from '@mui/icons-material/Close';
// import { IconButton } from '@mui/material';
// import { styled } from '@mui/system';

// // Context for managing alerts across the application.
// const AlertContext = createContext();

// // Styled component for SnackbarContent with dynamic background color.
// const StyledSnackbarContent = styled(SnackbarContent)(
//   ({ theme, bgcolor2 }) => ({
//     backgroundColor: bgcolor2 || theme.palette.primary.main,
//   })
// );

// // Hook to use the alert system within any component.
// export const useAlert = () => useContext(AlertContext);

// // Provider component to wrap application and manage alert states.
// export const AlertProvider = ({ children }) => {
//   const [alertState, setAlertState] = useState({
//     open: false,
//     message: '',
//     bgColor2: 'default',
//   });

//   // Function to show alerts.
//   const showAlert = (message, bgColor2 = 'default') => {
//     setAlertState({
//       open: true,
//       message,
//       bgColor2,
//     });
//   };

//   // Handles close event of the Snackbar, preventing close on clickaway.
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }
//     setAlertState((prevState) => ({
//       ...prevState,
//       open: false,
//     }));
//   };

//   return (
//     <AlertContext.Provider value={{ showAlert }}>
//       {children}
//       <Snackbar
//         open={alertState.open}
//         autoHideDuration={3000}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'right',
//         }}
//       >
//         <StyledSnackbarContent
//           bgcolor2={alertState.bgColor2}
//           message={<span id="client-snackbar">{alertState.message}</span>}
//           action={[
//             <IconButton
//               key="close"
//               aria-label="Close"
//               color="inherit"
//               onClick={handleClose}
//             >
//               <CloseIcon style={{ color: '#fff' }} />
//             </IconButton>,
//           ]}
//         />
//       </Snackbar>
//     </AlertContext.Provider>
//   );
// };
import React, { createContext, useContext, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { styled } from '@mui/system';

// Context for managing alerts across the application.
const AlertContext = createContext();

// Styled component for SnackbarContent with dynamic background color.
const StyledSnackbarContent = styled('div')(({ theme, bgcolor2 }) => ({
  backgroundColor: bgcolor2 || theme.palette.primary.main,
  padding: theme.spacing(1),
  color: theme.palette.getContrastText(bgcolor2 || theme.palette.primary.main),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

// Hook to use the alert system within any component.
export const useAlert = () => useContext(AlertContext);

// Provider component to wrap application and manage alert states.
export const AlertProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    message: '',
    bgColor2: 'default',
  });

  // Function to show alerts.
  const showAlert = (message, bgColor2 = 'default') => {
    setAlertState({
      open: true,
      message,
      bgColor2,
    });
  };

  // Handles close event of the Snackbar, preventing close on clickaway.
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
      <Snackbar
        open={alertState.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <StyledSnackbarContent bgcolor2={alertState.bgColor2}>
          <span id="client-snackbar">{alertState.message}</span>
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon style={{ color: '#fff' }} />
          </IconButton>
        </StyledSnackbarContent>
      </Snackbar>
    </AlertContext.Provider>
  );
};
