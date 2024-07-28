import parse from 'html-react-parser';

const HtmlValidationBoard = ({ htmlContent }) => {
  return (
    <div style={{ maxHeight: '80vh' }}>
      {htmlContent ? <div>{parse(htmlContent)}</div> : <p>Loading...</p>}
    </div>
  );
};

export default HtmlValidationBoard;
