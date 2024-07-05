import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useValidatorStore from '../../../zustand/useValidatorStore';
import useUserStore from '../../../zustand/useUserStore';
import { deleteOneValidationUblInfo } from '../../../services/api';
import { useAlert } from '../../../components/AlertError';

const PdfBox = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '200px',
  height: '200px',
  margin: '10px',
  border: '2px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '12px',
  backgroundColor: '#f0f0f0',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 20px rgba(0,0,0,0.1)',
    borderColor: '#651FFF',
    backgroundColor: '#ffffff',
  },
}));

const DeleteButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  right: '8px',
  color: 'rgba(255, 0, 0, 0.3)',
  '&:hover': {
    color: '#ff0000',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

// To show all the ubl's and handle deleting the reports/report
const ShowUblBox = ({ isLoading }) => {
  const nav = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedXml, setSelectedXml] = useState(null);

  const { showAlert } = useAlert();

  const deleteValidatorDataById = useValidatorStore(
    (state) => state.deleteValidatorDataById
  );
  const getValidatorData = useValidatorStore((state) => state.getValidatorData);
  const getUser = useUserStore((state) => state.getUser);
  const xmlFiles = getValidatorData();

  // when user opens a particular record they are taken to the xml file first and that dashboard
  const handleOpenValidationReport = (xml) => {
    nav(`/handle-files/validation-reports/ubl/${xml._id}`);
  };

  // to open modal to confirm delete a particular record
  const handleDeleteClick = (xml) => {
    setSelectedXml(xml);
    setOpenDialog(true);
  };

  // to finally delete the record when user has confirmed deletion
  const handleConfirmDelete = async () => {
    // getting the current user to get the userId
    const user = getUser();
    try {
      // Finally calling the delete record api
      await deleteOneValidationUblInfo({
        userId: user._id,
        dataId: selectedXml._id,
      });

      // Deleting the record from zustand as well
      deleteValidatorDataById(selectedXml._id);

      // Confirmation notice to user (feedback)
      showAlert('Deleted record successfully', 'green');
      setOpenDialog(false);
    } catch (error) {
      // Error handling
      showAlert(
        'Failed to delete the validation data. Please try again.',
        'tomato'
      );
    }
  };

  // To close the modal
  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {xmlFiles.map((xml) => (
        <PdfBox key={xml._id} onClick={() => handleOpenValidationReport(xml)}>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(xml);
            }}
          >
            <DeleteIcon />
          </DeleteButton>
          <h2 style={{ margin: '0', fontWeight: '500', color: '#333' }}>
            {xml.name}
          </h2>
        </PdfBox>
      ))}
      {isLoading && (
        <PdfBox>
          <CircularProgress color="primary" />
        </PdfBox>
      )}

      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete {selectedXml?.name}?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ShowUblBox;
