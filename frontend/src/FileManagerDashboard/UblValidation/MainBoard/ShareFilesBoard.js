import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import CustomInputBox from '../../../components/CustomInputBox';
import CustomPrimaryButton from '../../../components/CustomPrimaryButton';
import useValidatorStore from '../../../zustand/useValidatorStore';
import { useParams } from 'react-router-dom';
import { useAlert } from '../../../components/AlertError';
import { sendFileToEmail } from '../../../services/api';
import { validateEmail } from '../../../shared/validators';
import useUserStore from '../../../zustand/useUserStore';

// Styled container for the main board
const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '80vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
  position: 'relative',
}));

// Styled container for the form elements
const FormContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  maxWidth: '400px',
  margin: 'auto',
});

// Styled container for the checkbox group
const CheckboxContainer = styled('div')({
  marginTop: '20px',
  marginBottom: '20px',
});

// Styled container for the textarea
const TextareaContainer = styled('div')({
  position: 'relative',
  margin: '20px 0',
  width: '300px',
});

// Styled textarea
const StyledTextarea = styled('textarea')({
  width: '100%',
  padding: '20px',
  border: '1px solid #ccc',
  fontSize: '16px',
  borderRadius: '8px',
  '&:focus': {
    outline: 'none',
    borderColor: '#007BFF',
  },
});

// Styled label for the textarea
const TextareaLabel = styled('label')({
  position: 'absolute',
  top: '-10px',
  left: '10px',
  backgroundColor: '#fff',
  padding: '0 5px',
  fontSize: '13px',
  color: '#424242',
});

// Styled component for loading animation
const LoadingAnimation = styled('div')({
  fontSize: '16px',
  color: '#007BFF',
  fontStyle: 'italic',
  animation: 'typing 1.5s steps(10, end) infinite',
  '@keyframes typing': {
    '0%, 100%': { width: '0' },
    '50%': { width: '12em' },
  },
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  borderRight: '.1em solid',
});

// Main component for sharing files via email
const ShareFilesBoard = () => {
  const { id, process } = useParams(); // Retrieve id and process from URL parameters
  const { showAlert } = useAlert(); // Hook for showing alerts
  const { getUser } = useUserStore(); // Hook for retrieving user data
  const user = getUser(); // Get the current user

  const [data, setData] = useState({}); // State for storing validator data
  const [email, setEmail] = useState(''); // State for storing email input
  const [subject, setSubject] = useState(''); // State for storing subject input
  const [body, setBody] = useState(''); // State for storing email body input
  const [selectedFiles, setSelectedFiles] = useState({
    xml: false,
    validatorPdf: false,
  }); // State for storing selected files
  const [fileIds, setFileIds] = useState({
    xml: null,
    validatorPdf: null,
  }); // State for storing file IDs
  const [isLoading, setIsLoading] = useState(false); // State for managing loading animation

  const getValidatorDataById = useValidatorStore(
    (state) => state.getValidatorDataById
  ); // Hook to retrieve validator data by ID

  useEffect(() => {
    const data = getValidatorDataById(id); // Get validator data by ID
    setData(data); // Set the data state
    setFileIds({
      xml: data.ublId,
      validatorPdf: data.validatorId,
      _id: data._id,
    }); // Set the file IDs state
  }, [getValidatorDataById, id]); // Effect dependency on getValidatorDataById and id

  // Handler for checkbox change events
  const handleCheckboxChange = (event) => {
    setSelectedFiles({
      ...selectedFiles,
      [event.target.name]: event.target.checked,
    }); // Update selected files state
    setFileIds({
      ...fileIds,
      [event.target.name]: event.target.checked ? event.target.id : null,
    }); // Update file IDs state
  };

  // Handler for form submission
  const handleSubmit = async () => {
    try {
      if (!validateEmail(email)) {
        showAlert('Please enter a valid email', 'tomato'); // Validate email
        return;
      }

      if (!selectedFiles.validatorPdf && !selectedFiles.xml) {
        showAlert('Please select a file to send', 'tomato'); // Check if at least one file is selected
        return;
      }

      setIsLoading(true); // Show loading animation

      const fileTypes = [];
      if (selectedFiles.xml) {
        fileTypes.push('ubl'); // Add xml to file types if selected
      }
      if (selectedFiles.validatorPdf) {
        fileTypes.push('validate'); // Add validatorPdf to file types if selected
      }

      // Send the email with selected files
      const result = await sendFileToEmail({
        email,
        xmlId: selectedFiles.xml ? fileIds.xml : null,
        pdfId: null,
        validatorPdfId: selectedFiles.validatorPdf
          ? fileIds.validatorPdf
          : null,
        message: body,
        emailSubject: subject,
        sharedObjId: id,
        process: process,
        fileTypes,
        userId: user._id,
      });

      console.log(result, 'RESDSDSDSDSDD');

      console.log('Email:', email);
      console.log('Subject:', subject);
      console.log('Body:', body);
      console.log('Selected Files:', selectedFiles);
      console.log('File IDs:', fileIds);
      console.log(fileIds, selectedFiles);

      if (result.error) {
        showAlert(
          result.data.error ? result.data.error : 'Email not sent',
          'tomato'
        ); // Show error alert if email not sent
      } else {
        showAlert('Email sent successfully!', 'green'); // Show success alert if email sent
      }
    } catch (error) {
      showAlert(
        'There was an error sending the email. Please try again.',
        'tomato'
      ); // Show error alert if exception occurs
    } finally {
      setIsLoading(false); // Hide loading animation
    }
  };

  return (
    <BoardContainer>
      <FormContainer>
        {/* Input field for email address */}
        <CustomInputBox
          value={email}
          setValue={setEmail}
          label="Email Address"
          placeholder="Enter recipient's email"
          type="email"
        />
        {/* Input field for email subject */}
        <CustomInputBox
          value={subject}
          setValue={setSubject}
          label="Email Subject"
          placeholder="Enter email subject"
        />
        <TextareaContainer>
          {/* Textarea for email body */}
          <StyledTextarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter email body"
            rows={4}
          />
          <TextareaLabel>Email Body</TextareaLabel>
        </TextareaContainer>
        <CheckboxContainer>
          <FormGroup>
            {/* Checkbox for sending UBL XML file */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFiles.xml}
                  onChange={handleCheckboxChange}
                  name="xml"
                  id={data.ublId}
                />
              }
              label="Send UBL XML file"
            />
            {/* Checkbox for sending Validator PDF file */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedFiles.validatorPdf}
                  onChange={handleCheckboxChange}
                  name="validatorPdf"
                  id={data.validatorId}
                />
              }
              label="Send Validator PDF file"
            />
          </FormGroup>
        </CheckboxContainer>
        {/* Show loading animation or submit button based on loading state */}
        {isLoading ? (
          <LoadingAnimation>SENDING...</LoadingAnimation>
        ) : (
          <CustomPrimaryButton
            label="Send Email"
            onClick={handleSubmit}
            bgcolour="#007BFF"
          />
        )}
      </FormContainer>
    </BoardContainer>
  );
};

export default ShareFilesBoard;
