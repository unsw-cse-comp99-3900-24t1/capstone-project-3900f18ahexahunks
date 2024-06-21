import { styled } from '@mui/system';

const XmlBox = styled('div')({
  width: '200px',
  height: '200px',
  border: '1px solid #ccc',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const ShowXml = ({ xmlFiles }) => {
  return (
    <div>
      {xmlFiles.map((xml, index) => (
        <XmlBox key={index}>
          <embed src={xml} type="text/xml" width="100%" height="100%" />
        </XmlBox>
      ))}
    </div>
  );
};

export default ShowXml;
