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

const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
});

const VendorInformation = ({ invoice, handleVendorChange, errors }) => {
  return (
    <FlexContainer>
      <InputGroup>
        <Label>
          Name: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          type="text"
          name="name"
          value={invoice.vendor.name}
          onChange={handleVendorChange}
        />
        {errors['vendor.name'] && (
          <ErrorMessage>{errors['vendor.name']}</ErrorMessage>
        )}
      </InputGroup>

      <InputGroup>
        <Label>
          Address: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          type="text"
          name="address"
          value={invoice.vendor.address}
          onChange={handleVendorChange}
        />
        {errors['vendor.address'] && (
          <ErrorMessage>{errors['vendor.address']}</ErrorMessage>
        )}
      </InputGroup>

      <InputGroup>
        <Label>
          VAT Number: <span style={{ color: 'red' }}>*</span>
        </Label>
        <Input
          type="text"
          name="vat_number"
          value={invoice.vendor.vat_number}
          onChange={handleVendorChange}
        />
        {errors['vendor.vat_number'] && (
          <ErrorMessage>{errors['vendor.vat_number']}</ErrorMessage>
        )}
      </InputGroup>
    </FlexContainer>
  );
};
export default VendorInformation;
