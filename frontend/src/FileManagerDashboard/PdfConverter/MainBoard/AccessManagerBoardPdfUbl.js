import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { validateEmail } from '../../../shared/validators';
import { useAlert } from '../../../components/AlertError';
import { useParams } from 'react-router-dom';
import { giveAccessPdfUbl } from '../../../services/api';
import usePdfStore from '../../../zustand/usePdfStore';

const AccessManagerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(4),
  margin: '0 auto',
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  height: '50vh',
  maxWidth: '600px',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  gap: theme.spacing(2),
}));

const AccessManagerBoardPdfUbl = () => {
  const { id } = useParams();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const { showAlert } = useAlert();

  const getPdfDataById = usePdfStore((state) => state.getPdfDataById);

  const handleClickOpen = () => {
    if (!validateEmail(email)) return showAlert('Invalid email', 'tomato');
    const data = getPdfDataById(id);
    setName(data.name);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    const data = getPdfDataById(id);
    console.log(data, id);
    console.log('Access granted to:', email);

    const response = await giveAccessPdfUbl({
      email,
      ublId: data.ublId,
      validatorId: data.validatorId,
      pdfId: data.pdfId,
      validationHtml: data.validationHtml,
      validationJson: data.validationJson,
      name,
    });

    setOpen(false);
    console.log(response, 'LOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOLOL');

    if (response.error) {
      showAlert(
        `${response.data.error ? response.data.error : 'Error giving access to the user'}`,
        'tomato'
      );
    } else {
      showAlert(
        `${response.data.message ? response.data.message : 'Access Granted'}`,
        'green'
      );
    }
  };

  return (
    <AccessManagerContainer>
      <Typography variant="h4" gutterBottom>
        Access Manager
      </Typography>
      <FormContainer>
        <TextField
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title="Email of the user in app that you want to give access to">
                  <InfoIcon />
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Give Access
        </Button>
      </FormContainer>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Access</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to give access to {email}?
          </DialogContentText>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </AccessManagerContainer>
  );
};

export default AccessManagerBoardPdfUbl;
