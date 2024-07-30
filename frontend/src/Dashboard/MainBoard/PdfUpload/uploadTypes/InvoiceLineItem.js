import { styled } from '@mui/system';

const DeleteButton = styled('button')({
  backgroundColor: '#ff1744',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginLeft: '10px',
  '&:hover': {
    backgroundColor: '#d50000',
  },
});

const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
});

const SectionTitle = styled('h2')({
  color: '#651FFF',
  borderBottom: '2px solid #651FFF',
  paddingBottom: '5px',
  marginBottom: '10px',
});

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

const InvoiceLineItem = ({
  index,
  item,
  handleLineItemChange,
  errors,
  invoice,
  deleteLineItem,
}) => {
  return (
    <div key={index}>
      <SectionTitle>Item {index + 1}</SectionTitle>
      <FlexContainer>
        <InputGroup>
          <Label>
            ID: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            name="id"
            value={item.id}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].id`] && (
            <ErrorMessage>{errors[`line_items[${index}].id`]}</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <Label>
            Quantity: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="number"
            name="quantity"
            value={item.quantity}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].quantity`] && (
            <ErrorMessage>
              {errors[`line_items[${index}].quantity`]}
            </ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <Label>
            Total: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="number"
            name="total"
            value={item.total}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].total`] && (
            <ErrorMessage>{errors[`line_items[${index}].total`]}</ErrorMessage>
          )}
        </InputGroup>
      </FlexContainer>

      <FlexContainer>
        <InputGroup>
          <Label>
            Description: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="text"
            name="description"
            value={item.description}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].description`] && (
            <ErrorMessage>
              {errors[`line_items[${index}].description`]}
            </ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <Label>
            Price: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="number"
            name="price"
            value={item.price}
            onChange={(e) => handleLineItemChange(index, e)}
          />
          {errors[`line_items[${index}].price`] && (
            <ErrorMessage>{errors[`line_items[${index}].price`]}</ErrorMessage>
          )}
        </InputGroup>
      </FlexContainer>

      {invoice.line_items.length > 1 && (
        <DeleteButton
          type="button"
          onClick={() => {
            if (window.confirm('Are you sure you want to delete this item?')) {
              deleteLineItem(index);
            }
          }}
        >
          Delete Item
        </DeleteButton>
      )}
    </div>
  );
};
export default InvoiceLineItem;
