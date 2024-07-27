import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CustomInputBox from '../../../components/CustomInputBox';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import useUserStore from '../../../zustand/useUserStore';
import {
  Tooltip,
  Checkbox,
  FormControlLabel,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import GuiForm from './uploadTypes/GuiForm';

const UploadContainer = styled('div')({
  width: '200px',
  height: '200px',
  border: '2px dashed #007BFF',
  borderRadius: '10px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  '&:hover label': {
    color: '#fff',
  },
});

const UploadLabel = styled('label')({
  fontSize: '3em',
  color: '#007BFF',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#fff',
  },
});

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  // width: 500,
  height: '80vh',
  bgcolor: '#f9f9f9',
  borderRadius: '10px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
  p: 4,
};

const ModalHeader = styled('h2')({
  margin: 0,
  marginBottom: '16px',
  fontFamily: 'Arial, sans-serif',
  fontWeight: 700,
  color: '#333',
});

const FileInput = styled('input')({
  display: 'block',
  marginBottom: '16px',
  fontSize: '1rem',
  padding: '8px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  transition: 'border-color 0.3s ease',
  '&:focus': {
    borderColor: '#007BFF',
  },
});

const UploadBox = ({ handleUpload, setPdfs }) => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const { getUser, updateGLN } = useUserStore();
  const user = getUser();
  const [vendorGln, setVendorGln] = useState(user.gln ? user.gln : '');
  const [customerGln, setCustomerGln] = useState('');
  const [saveGln, setSaveGln] = useState(false);
  const [activeTab, setActiveTab] = useState(0); // 0 for Upload, 1 for Fill Form

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = () => {
    if (file) {
      handleUpload(file, vendorGln, customerGln, saveGln, name);
      handleClose();
      if (saveGln) {
        updateGLN(vendorGln);
      }
    }
    setFile(null);
    setName('');
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <>
      <UploadContainer onClick={handleOpen}>
        <UploadLabel htmlFor="pdf-upload">+</UploadLabel>
      </UploadContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={{ ...modalStyle, width: activeTab === 0 ? 500 : 920 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            centered
            TabIndicatorProps={{ style: { backgroundColor: '#651FFF' } }}
          >
            <Tab
              label="Upload"
              sx={{
                '&.Mui-selected': {
                  color: '#651FFF',
                },
              }}
            />
            <Tab
              label="Fill Form"
              sx={{
                '&.Mui-selected': {
                  color: '#651FFF',
                },
              }}
            />
          </Tabs>
          <div
            style={{
              overflow: 'auto',
              height: '95%',
            }}
          >
            {activeTab === 0 && (
              <div>
                <ModalHeader id="modal-title">Upload PDF</ModalHeader>
                <CustomInputBox
                  value={name}
                  setValue={setName}
                  type="text"
                  label="File Name"
                  placeholder="File A"
                  additionalStyles={{ width: '80%' }}
                />
                <div style={{ position: 'relative', marginTop: '30px' }}>
                  <CustomInputBox
                    value={vendorGln}
                    setValue={setVendorGln}
                    type="text"
                    label="Your GLN"
                    placeholder="1234567898765"
                    additionalStyles={{ width: '80%' }}
                  />
                  <Tooltip title="(GLN) is a unique identifier used to identify physical locations, legal entities, or functions within a company (13-digit long number). GS1 Standards.">
                    <InfoIcon
                      style={{
                        position: 'absolute',
                        right: '15%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                </div>
                <div style={{ position: 'relative', marginTop: '30px' }}>
                  <CustomInputBox
                    value={customerGln}
                    setValue={setCustomerGln}
                    type="text"
                    label="Customer GLN"
                    placeholder="9876543212345"
                    additionalStyles={{ width: '80%' }}
                  />
                  <Tooltip title="(GLN) is a unique identifier used to identify physical locations, legal entities, or functions within a company (13-digit long number). GS1 Standards.">
                    <InfoIcon
                      style={{
                        position: 'absolute',
                        right: '15%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                      }}
                    />
                  </Tooltip>
                </div>
                <FileInput
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  id="pdf-upload"
                />
                <FormControlLabel
                  style={{ marginLeft: '5px' }}
                  control={
                    <Checkbox
                      checked={saveGln}
                      onChange={(e) => setSaveGln(e.target.checked)}
                      name="saveGln"
                    />
                  }
                  label="Save your GLN for future uploads"
                />
                <CustomPrimaryButton
                  label="Upload"
                  bgcolour="#651FFF"
                  additionalStyle={{
                    width: '92%',
                    height: '50px',
                    fontSize: '13px',
                  }}
                  disabled={
                    name === '' ||
                    file === null ||
                    vendorGln.length !== 13 ||
                    customerGln.length !== 13
                  }
                  onClick={handleSubmit}
                />
              </div>
            )}
            {activeTab === 1 && (
              <div>
                <GuiForm setPdfs={setPdfs} />
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default UploadBox;
