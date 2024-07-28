import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import ValidateUblHelp from './ValidateUblHelp';
import ConvertPdfInvoice from './ConvertPdfInvoice';
import { AppBar, Toolbar, Button } from '@mui/material';

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  height: '80vh',
  overflowY: 'auto',
}));

const Navbar = styled(AppBar)(({ theme }) => ({
  position: 'sticky',
  top: '-30px',
  backgroundColor: '#651FFF',
  color: 'white',
  zIndex: theme.zIndex.drawer + 1,
  // width: '100%',
}));

const Section = styled('div')(({ theme }) => ({
  // padding: theme.spacing(4),
  // width: '100%',
}));

const HelpBoard = () => {
  const validateUblHelpRef = useRef(null);
  const convertPdfInvoiceRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledContainer>
      <Navbar>
        <Toolbar>
          <Button
            color="inherit"
            onClick={() => scrollToSection(validateUblHelpRef)}
            style={{
              fontWeight: '900',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              marginRight: '20px',
            }}
          >
            Validate UBL Help
          </Button>
          <Button
            color="inherit"
            onClick={() => scrollToSection(convertPdfInvoiceRef)}
            style={{ fontWeight: '900', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          >
            Convert PDF Invoice
          </Button>
        </Toolbar>
      </Navbar>
      <Section ref={validateUblHelpRef}>
        <ValidateUblHelp />
      </Section>
      <Section ref={convertPdfInvoiceRef}>
        <ConvertPdfInvoice />
      </Section>
    </StyledContainer>
  );
};

export default HelpBoard;
