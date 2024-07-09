import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const VideoWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  margin: theme.spacing(4, 0),
  borderRadius: theme.shape.borderRadius,
  overflow: 'hidden',
  boxShadow: theme.shadows[3],
  '& iframe': {
    width: '100%',
    height: '450px',
    border: 'none',
  },
}));

const StepsPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  maxWidth: '800px',
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  boxShadow: theme.shadows[3],
}));

const HelpBoard = () => {
  return (
    <StyledContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        UBL VALIDATION
      </Typography>
      <VideoWrapper>
        <iframe
          src="https://www.youtube.com/embed/kiddMKPiQUw?mute=1"
          title="Help Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </VideoWrapper>
      <StepsPaper>
        <Typography variant="h6" component="h2" gutterBottom>
          Steps to Complete UBL Validation
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Step 1: Upload your UBL file to the system." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 2: The system will automatically validate the UBL file." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 3: Check the validation report for any errors." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 4: If there are errors, correct them and re-upload the UBL file." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 5: Download the validation report as a PDF for your records." />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Step 6: Once validation is successful, proceed with your business process." />
          </ListItem>
        </List>
      </StepsPaper>
    </StyledContainer>
  );
};

export default HelpBoard;
