import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
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
import usePdfStore from '../../../zustand/usePdfStore';

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
  overflow: 'hidden',
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

const ShareButton = styled(IconButton)({
  position: 'absolute',
  top: '8px',
  left: '8px',
  color: 'rgba(0, 0, 255, 0.3)',
  '&:hover': {
    color: '#0000ff',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

const DateTimeLabel = styled('p')({
  margin: '8px 0 0 0',
  fontSize: '12px',
  color: '#666',
});

const ShowPdf = ({ isLoading, pdfs }) => {
  const nav = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const { showAlert } = useAlert();

  const deletePdfDataById = usePdfStore((state) => state.deletePdfDataById);
  const getUser = useUserStore((state) => state.getUser);

  const handleOpenValidationReport = (pdf) => {
    nav(`/handle-files/convertion-reports/ubl/${pdf._id}`);
  };

  const handleShareClick = (pdf) => {
    nav(`/handle-files/convertion-reports/share/${pdf._id}`);
  };

  const handleDeleteClick = (pdf) => {
    setSelectedPdf(pdf);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    const user = getUser();
    try {
      await deleteOneValidationUblInfo({
        userId: user._id,
        dataId: selectedPdf._id,
      });

      deletePdfDataById(selectedPdf._id);

      showAlert('Deleted record successfully', 'green');
      setOpenDialog(false);
    } catch (error) {
      showAlert(
        'Failed to delete the validation data. Please try again.',
        'tomato'
      );
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {pdfs.map((pdf) => (
        <PdfBox key={pdf._id} onClick={() => handleOpenValidationReport(pdf)}>
          <DeleteButton
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteClick(pdf);
            }}
          >
            <DeleteIcon />
          </DeleteButton>
          <ShareButton
            onClick={(e) => {
              e.stopPropagation();
              handleShareClick(pdf);
            }}
          >
            <ShareIcon />
          </ShareButton>
          <h2 style={{ margin: '0', fontWeight: '500', color: '#333' }}>
            {pdf.name}
          </h2>
          <DateTimeLabel>
            {new Date(pdf.date).toLocaleTimeString()}{' '}
            {new Date(pdf.date).toLocaleDateString()}
          </DateTimeLabel>
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
          Are you sure you want to delete {selectedPdf?.name}?
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

export default ShowPdf;
