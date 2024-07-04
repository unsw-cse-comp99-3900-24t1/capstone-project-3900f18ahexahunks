import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useUserStore from '../../zustand/useUserStore';
import { changeImageProfileEdit } from '../../services/api';

const UploadInput = styled('input')({
  display: 'none',
});

const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(2),
}));

const ImagePreview = styled('img')({
  maxWidth: '100%',
  maxHeight: '200px',
  marginBottom: '10px',
});

const Modal = ({ closeModal }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const getUser = useUserStore((state) => state.getUser);
  const user = getUser();

  // const handleFileChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);
  //   setPreview(URL.createObjectURL(selectedFile));
  // };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };
  // /edit/change-profile-photo
  const handleUpload = () => {
    if (file) {
      // Handle file upload logic here (e.g., upload to server)
      console.log('Uploaded file:', file, preview);
      changeImageProfileEdit({ image: preview, userId: user._id });
      closeModal(); // Close modal after upload
    } else {
      console.log('No file selected');
    }
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle>Upload Profile Picture</DialogTitle>
      <StyledDialogContent>
        <label htmlFor="upload-input">
          <UploadInput
            id="upload-input"
            type="file"
            onChange={handleFileChange}
          />
          {preview ? (
            <ImagePreview src={preview} alt="Preview" />
          ) : (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              size="large"
            >
              <CloudUploadIcon fontSize="large" />
            </IconButton>
          )}
        </label>
        {file && (
          <Typography variant="body2" gutterBottom>
            {file.name}
          </Typography>
        )}
      </StyledDialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Cancel</Button>
        <Button onClick={handleUpload} variant="contained" color="primary">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
