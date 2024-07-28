import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';
import { styled } from '@mui/system';

const FooterContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#000000',
  color: 'white',
  marginTop: 'auto',
}));

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">HexaHunks</Typography>
          <Typography variant="subtitle1">
            Your partner in Hexa-Growth.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Links</Typography>
          <Link href="#" color="inherit">
            About Us
          </Link>
          <br />
          <Link href="#" color="inherit">
            Contact
          </Link>
          <br />
          <Link href="#" color="inherit">
            Support
          </Link>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6">Contact</Typography>
          <Typography variant="body2">Email: hexahunks@gmail.com</Typography>
          <Typography variant="body2">Phone: +123 456 7890</Typography>
        </Grid>
      </Grid>
    </FooterContainer>
  );
};

export default Footer;
