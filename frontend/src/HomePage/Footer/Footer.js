import React from 'react';
import { Box, Typography, Link, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const FooterContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(45deg, #3f51b5, #651FFF)',
  color: '#fff',
  padding: '40px 20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: '30px',
  textAlign: 'center',
  width: '100%',
  maxWidth: '800px',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#fff',
  textDecoration: 'none',
  margin: '0 10px',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  marginTop: '20px',
  '& > *': {
    margin: '0 10px',
  },
}));

const Footer = () => {
  return (
    <FooterContainer component="footer">
      <FooterSection>
        <Typography variant="h4" gutterBottom>
          HexaHunks
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Your partner in Hexa-Growth.
        </Typography>
      </FooterSection>
      <FooterSection>
        <Typography variant="h6" gutterBottom>
          Links
        </Typography>
        <FooterLink href="#">About Us</FooterLink>
        <FooterLink href="#">Contact</FooterLink>
        <FooterLink href="#">Support</FooterLink>
      </FooterSection>
      <FooterSection>
        <Typography variant="h6" gutterBottom>
          Contact
        </Typography>
        <Typography variant="body2" gutterBottom>
          Email: hexahunks@gmail.com
        </Typography>
        <Typography variant="body2" gutterBottom>
          Phone: +123 456 7890
        </Typography>
      </FooterSection>
      <SocialIcons>
        <IconButton
          aria-label="facebook"
          component="a"
          href="#"
          sx={{ color: '#fff' }}
        >
          <Facebook />
        </IconButton>
        <IconButton
          aria-label="twitter"
          component="a"
          href="#"
          sx={{ color: '#fff' }}
        >
          <Twitter />
        </IconButton>
        <IconButton
          aria-label="instagram"
          component="a"
          href="#"
          sx={{ color: '#fff' }}
        >
          <Instagram />
        </IconButton>
        <IconButton
          aria-label="linkedin"
          component="a"
          href="#"
          sx={{ color: '#fff' }}
        >
          <LinkedIn />
        </IconButton>
      </SocialIcons>
    </FooterContainer>
  );
};

export default Footer;
