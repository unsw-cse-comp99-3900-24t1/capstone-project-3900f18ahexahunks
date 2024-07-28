import { styled } from '@mui/system';
import React from 'react';
import GetAppIcon from '@mui/icons-material/GetApp';

const JsonContainer = styled('div')({
  maxWidth: 'fit-content',
  overflowWrap: 'break-word',
  wordBreak: 'break-all',
  whiteSpace: 'pre-wrap',
  backgroundColor: '#282c34',
  color: '#abb2bf',
  padding: '20px 30px',
  borderRadius: '10px',
  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  fontFamily: 'Fira Code, monospace',
  fontSize: '16px',
  lineHeight: '1.5',
  border: '1px solid #444',
  margin: '20px auto',
  position: 'relative',
});

const DownloadButton = styled('button')({
  position: 'sticky',
  top: '10px',
  left: '10px',
  backgroundColor: '#6200ea',
  border: 'none',
  borderRadius: '5px',
  padding: '8px',
  cursor: 'pointer',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: '#3700b3',
  },
});

const ButtonText = styled('span')({
  marginLeft: '8px',
  fontSize: '14px',
});

const SyntaxHighlight = ({ json }) => {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, null, 2);
  }
  json = json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?)|([{}[\],])/g,
    (match) => {
      let cls = 'number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'key';
        } else {
          cls = 'string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'boolean';
      } else if (/null/.test(match)) {
        cls = 'null';
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
  return { __html: json };
};

const downloadJson = (jsonContent) => {
  const element = document.createElement('a');
  const file = new Blob([JSON.stringify(jsonContent, null, 2)], {
    type: 'text/plain',
  });
  element.href = URL.createObjectURL(file);
  element.download = 'jsonContent.txt';
  document.body.appendChild(element); // Required for this to work in FireFox
  element.click();
  document.body.removeChild(element); // Clean up
};

const JsonValidationBoard = ({ jsonContent }) => {
  return (
    <div>
      <DownloadButton onClick={() => downloadJson(jsonContent)}>
        <GetAppIcon fontSize="small" />
        <ButtonText>Download</ButtonText>
      </DownloadButton>
      <JsonContainer>
        <pre dangerouslySetInnerHTML={SyntaxHighlight({ json: jsonContent })} />
      </JsonContainer>
    </div>
  );
};

export default JsonValidationBoard;

const globalStyles = `
  .string { color: #ce9178; }
  .number { color: #b5cea8; }
  .boolean { color: #569cd6; }
  .null { color: #dcdcaa; }
  .key { color: #9cdcfe; }
`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = globalStyles;
document.head.appendChild(styleSheet);
