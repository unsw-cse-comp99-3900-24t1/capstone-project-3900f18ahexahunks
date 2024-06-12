import React from 'react';
import { Modal } from '@mui/material';
import { Box } from '@mui/system';

// Custom styled modal for various pop-up functionalities within the application.
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '370px',
  maxHeight: '500px',
  height: 'auto',
  overflow: 'auto',
  bgcolor: 'background.paper',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 123, 255, 0.25)',
  p: 4,
  background: 'linear-gradient(to bottom, #005a4f 0%, #013220 100%)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  animation: 'fadeIn 0.2s ease-in-out',
  '@media (max-width: 650px)': {
    width: '300px',
  },
};

// Modal component providing a customizable pop-up with animation.
const CustomModal = ({ open, handleCloseCreateTextBox, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleCloseCreateTextBox}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
