import parse from 'html-react-parser';

const HtmlValidationBoard = ({ htmlContent }) => {
  return (
    <div>
      {htmlContent ? <div>{parse(htmlContent)}</div> : <p>Loading...</p>}
    </div>
  );
};

export default HtmlValidationBoard;
