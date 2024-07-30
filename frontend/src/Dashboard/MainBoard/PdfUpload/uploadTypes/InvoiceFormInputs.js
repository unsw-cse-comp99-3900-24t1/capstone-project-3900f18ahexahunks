import { styled } from '@mui/system';

const InputGroup = styled('div')({
  marginBottom: '15px',
  flex: '1',
  minWidth: 'calc(50% - 10px)',
  boxSizing: 'border-box',
});

const Label = styled('label')({
  color: '#000',
  marginBottom: '5px',
  display: 'block',
});

const Input = styled('input')({
  width: '90%',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  marginBottom: '5px',
  '&:focus': {
    borderColor: '#651FFF',
    outline: 'none',
  },
});

const ErrorMessage = styled('p')({
  color: 'red',
  fontSize: '12px',
  marginTop: '-4px',
});

const InvoiceFormInputs = ({
  type,
  handleChange,
  error,
  label,
  value,
  name,
  required,
}) => {
  return (
    <InputGroup>
      <Label>
        {label} {required ? <span style={{ color: 'red' }}>*</span> : <></>}
      </Label>
      <Input type={type} name={name} value={value} onChange={handleChange} />
      {required ? error && <ErrorMessage>{error}</ErrorMessage> : <></>}
    </InputGroup>
  );
};
export default InvoiceFormInputs;
