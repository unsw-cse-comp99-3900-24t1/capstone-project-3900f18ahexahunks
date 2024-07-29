import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import CustomInputBox from '../../components/CustomInputBox';
import CustomPrimaryButton from '../../components/CustomPrimaryButton';

const DeleteModal = ({
  open,
  handleClose,
  setPassword,
  password,
  handleConfirmDelete,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete your account? This action cannot be
          undone.
        </DialogContentText>
      </DialogContent>
      <CustomInputBox
        style={{ marginLeft: '70px', marginBottom: '30px', width: '70%' }}
        placeholder="########"
        label="Password"
        type="password"
        setValue={setPassword}
        value={password}
        data-testid={'login-password'}
      />
      <DialogActions
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '10px',
        }}
      >
        <CustomPrimaryButton
          label="Cancel"
          bgcolour="#666"
          additionalStyle={{
            width: '40%',
            height: '45px',
            fontSize: '15px',
          }}
          onClick={handleClose}
          dataTestid={'login-submit'}
        />
        <CustomPrimaryButton
          label="Confirm"
          bgcolour="#651FFF"
          additionalStyle={{
            width: '40%',
            height: '45px',
            fontSize: '15px',
          }}
          onClick={handleConfirmDelete}
          dataTestid={'login-submit'}
        />
      </DialogActions>
    </Dialog>
  );
};
export default DeleteModal;
