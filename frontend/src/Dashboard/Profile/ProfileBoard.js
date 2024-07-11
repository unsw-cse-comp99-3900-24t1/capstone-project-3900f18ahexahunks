import React, { useState } from 'react';
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Avatar,
  List,
  Paper,
} from '@mui/material';
import EmailHistoryItem from './EmailHistoryItem';

const sampleHistory = [
  {
    fileName: 'Report1.pdf',
    email: 'user1@example.com',
    subject: 'Annual Report',
    type: ['PDF', 'UBL'],
    date: '2024-01-01T10:00:00',
  },
  {
    fileName: 'Invoice.xml',
    email: 'user2@example.com',
    subject: 'Invoice',
    type: ['XML', 'UBL'],
    date: '2024-02-15T15:30:00',
  },
  {
    fileName: 'Notes.docx',
    email: 'user3@example.com',
    subject: 'Meeting Notes',
    type: ['DOCX', 'UBL'],
    date: '2024-03-10T09:15:00',
  },
];

const ProfileBoard = () => {
  const [username, setUsername] = useState('John Doe');
  const [profilePic, setProfilePic] = useState(null);
  const [history, setHistory] = useState(sampleHistory);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteHistory = (index) => {
    const newHistory = [...history];
    newHistory.splice(index, 1);
    setHistory(newHistory);
  };

  const handleOpenReport = (e, item) => {
    e.stopPropagation();
    console.log(item);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        User Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              Update Profile
            </Typography>
            <Avatar
              src={profilePic}
              alt="Profile Picture"
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-pic-upload"
              type="file"
              onChange={handleProfilePicChange}
            />
            <label htmlFor="profile-pic-upload">
              <Button variant="contained" color="primary" component="span">
                Upload Profile Picture
              </Button>
            </label>
            <TextField
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="secondary">
              Update
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: 16 }}>
            <Typography variant="h6" gutterBottom>
              User History
            </Typography>
            <List>
              {history.map((item, index) => (
                <div key={index}>
                  <EmailHistoryItem
                    handleOpenReport={handleOpenReport}
                    item={item}
                    handleDeleteHistory={handleDeleteHistory}
                    index={index}
                  />
                </div>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfileBoard;
