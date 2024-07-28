// // import HtmlValidationBoard from './HtmlValidationBoard';
// // import ValidBoard from './ValidBoard';

// // const ValidationSelectors = ({ UblValidateData }) => {
// //   return (
// //     <>
// //       <ValidBoard fileId={UblValidateData.validatorId} />
// //       <HtmlValidationBoard htmlContent={UblValidateData.validationHtml} />
// //     </>
// //   );
// // };
// // export default ValidationSelectors;
// import React, { useState } from 'react';
// import HtmlValidationBoard from './HtmlValidationBoard';
// import ValidBoard from './ValidBoard';
// import {
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   FormControl,
//   FormLabel,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';

// const BoardContainer = styled('div')(({ theme }) => ({
//   padding: theme.spacing(4),
//   borderRadius: theme.shape.borderRadius,
//   margin: '0 auto',
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-start',
//   height: '80vh',
//   overflow: 'auto',
//   width: '90%',
//   backgroundColor: '#fff',
//   boxShadow: theme.shadows[5],
//   position: 'relative',
// }));

// const ValidationSelectors = ({ UblValidateData }) => {
//   const [selectedView, setSelectedView] = useState('html');

//   const handleViewChange = (event) => {
//     setSelectedView(event.target.value);
//   };

//   return (
//     <div>
//       <FormControl component="fieldset">
//         <FormLabel component="legend">Select View</FormLabel>
//         <RadioGroup
//           row
//           aria-label="view"
//           name="view"
//           value={selectedView}
//           onChange={handleViewChange}
//         >
//           <FormControlLabel
//             value="html"
//             control={<Radio />}
//             label="HTML View"
//           />
//           <FormControlLabel value="pdf" control={<Radio />} label="PDF View" />
//         </RadioGroup>
//       </FormControl>
//       {selectedView === 'html' ? (
//         <BoardContainer>
//           <HtmlValidationBoard htmlContent={UblValidateData.validationHtml} />
//         </BoardContainer>
//       ) : (
//         <ValidBoard fileId={UblValidateData.validatorId} />
//       )}
//     </div>
//   );
// };

// export default ValidationSelectors;
import React, { useState } from 'react';
import HtmlValidationBoard from './HtmlValidationBoard';
import ValidBoard from './ValidBoard';
import { ButtonGroup, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const BoardContainer = styled('div')(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  height: '70vh',
  overflow: 'auto',
  width: '90%',
  backgroundColor: '#fff',
  boxShadow: theme.shadows[5],
  position: 'relative',
}));

const SelectorContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  // width: '100%',
  marginRight: '10%',
}));

const StyledButton = styled(Button)(({ theme, selected }) => ({
  backgroundColor: selected ? '#651FFF' : '#fff',
  color: selected ? '#fff' : '#000',
  '&:hover': {
    backgroundColor: selected ? '#531ecc' : theme.palette.grey[300],
  },
  transition: 'background-color 0.3s ease, color 0.3s ease',
}));

const ValidationSelectors = ({ htmlContent, fileId }) => {
  const [selectedView, setSelectedView] = useState('html');

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  return (
    <div>
      <SelectorContainer>
        <ButtonGroup>
          <StyledButton
            selected={selectedView === 'html'}
            onClick={() => handleViewChange('html')}
          >
            HTML View
          </StyledButton>
          <StyledButton
            selected={selectedView === 'pdf'}
            onClick={() => handleViewChange('pdf')}
          >
            PDF View
          </StyledButton>
        </ButtonGroup>
      </SelectorContainer>
      {selectedView === 'html' ? (
        <BoardContainer>
          <HtmlValidationBoard htmlContent={htmlContent} />
        </BoardContainer>
      ) : (
        <ValidBoard fileId={fileId} />
      )}
    </div>
  );
};

export default ValidationSelectors;
