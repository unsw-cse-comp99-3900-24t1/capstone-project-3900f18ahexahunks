import React, { useRef } from 'react';
import { styled } from '@mui/material/styles';
import ValidateUblHelp from './ValidateUblHelp';
import ConvertPdfInvoice from './ConvertPdfInvoice';
import { AppBar, Toolbar, Button } from '@mui/material';
import ShareFilesHelp from './ShareFilesHelp';

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
  const shareFilesHelp = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <StyledContainer>
      <Navbar>
        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
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
            style={{
              fontWeight: '900',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              marginRight: '20px',
            }}
          >
            Convert PDF Invoice
          </Button>
          <Button
            color="inherit"
            onClick={() => scrollToSection(shareFilesHelp)}
            style={{ fontWeight: '900', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
          >
            Share File Help
          </Button>
        </Toolbar>
      </Navbar>
      <Section ref={validateUblHelpRef}>
        <ValidateUblHelp />
      </Section>
      <Section ref={convertPdfInvoiceRef}>
        <ConvertPdfInvoice />
      </Section>
      <Section ref={shareFilesHelp}>
        <ShareFilesHelp />
      </Section>
    </StyledContainer>
  );
};

export default HelpBoard;
