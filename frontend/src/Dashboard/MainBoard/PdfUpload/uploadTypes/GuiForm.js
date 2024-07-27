import React, { useState } from 'react';
import { styled } from '@mui/system';
import { guiFormToUblConvert } from '../../../../services/api';
import useUserStore from '../../../../zustand/useUserStore';
import { Tooltip, Checkbox, FormControlLabel } from '@mui/material';
import CustomInputBox from '../../../../components/CustomInputBox';
import InfoIcon from '@mui/icons-material/Info';
import { useAlert } from '../../../../components/AlertError';
import usePdfStore from '../../../../zustand/usePdfStore';

const FormContainer = styled('div')({
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '900px',
  margin: '20px auto',
  fontFamily: 'Arial, sans-serif',
});

const FormTitle = styled('h1')({
  color: '#651FFF',
  textAlign: 'center',
  marginBottom: '20px',
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

const AddButton = styled('button')({
  backgroundColor: '#651FFF',
  color: 'white',
  border: 'none',
  padding: '10px 20px',
  borderRadius: '4px',
  cursor: 'pointer',
  marginTop: '10px',
  '&:hover': {
    backgroundColor: '#531ecc',
  },
});

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

const SubmitButton = styled('button')({
  backgroundColor: '#651FFF',
  color: 'white',
  border: 'none',
  padding: '15px 30px',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'block',
  width: '100%',
  marginTop: '20px',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#531ecc',
  },
  '&:disabled': {
    backgroundColor: '#666',
    color: '#f2f2f2',
  },
});

const FlexContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
});

const GuiForm = ({ setPdfs }) => {
  const [invoice, setInvoice] = useState({
    invoice_number: '1',
    date: '1',
    due_date: '1',
    purchase_order_number: '1',
    subtotal: '1',
    tax: '1',
    total: '1',
    vendor: {
      name: '1',
      address: '1',
      vat_number: '1',
    },
    customer: {
      name: '1',
      address: '1',
      vat_number: '1',
    },
    line_items: [
      { id: '1', quantity: '1', total: '1', description: '1', price: '1' },
    ],
  });
  const { getUser, updateGLN } = useUserStore();
  const user = getUser();
  const [vendorGln, setVendorGln] = useState(user.gln ? user.gln : '');
  const [customerGln, setCustomerGln] = useState('');
  const [saveGln, setSaveGln] = useState(false);
  const [name, setName] = useState('');

  const addPdfData = usePdfStore((state) => state.addPdfData);

  const { showAlert } = useAlert();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      [name]: value,
    }));
  };

  const handleVendorChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      vendor: {
        ...prevInvoice.vendor,
        [name]: value,
      },
    }));
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      customer: {
        ...prevInvoice.customer,
        [name]: value,
      },
    }));
  };

  const handleLineItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLineItems = [...invoice.line_items];
    updatedLineItems[index] = {
      ...updatedLineItems[index],
      [name]: value,
    };
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      line_items: updatedLineItems,
    }));
  };

  const addLineItem = () => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      line_items: [
        ...prevInvoice.line_items,
        { id: '', quantity: '', total: '', description: '', price: '' },
      ],
    }));
  };

  const deleteLineItem = (index) => {
    if (invoice.line_items.length > 1) {
      const updatedLineItems = invoice.line_items.filter(
        (item, itemIndex) => index !== itemIndex
      );
      setInvoice((prevInvoice) => ({
        ...prevInvoice,
        line_items: updatedLineItems,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = [
      'invoice_number',
      'date',
      'due_date',
      'subtotal',
      'total',
      'vendor.name',
      'vendor.address',
      'vendor.vat_number',
      'customer.name',
      'customer.address',
      'customer.vat_number',
    ];

    requiredFields.forEach((field) => {
      const fieldParts = field.split('.');
      const fieldValue =
        fieldParts.length === 1
          ? invoice[fieldParts[0]]
          : invoice[fieldParts[0]][fieldParts[1]];

      if (!fieldValue) {
        newErrors[field] = 'This field is required';
      }
    });

    invoice.line_items.forEach((item, index) => {
      ['id', 'quantity', 'total', 'description', 'price'].forEach((field) => {
        if (!item[field]) {
          newErrors[`line_items[${index}].${field}`] = 'This field is required';
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userId = user._id;
      const response = await guiFormToUblConvert({
        invoice: invoice,
        vendorGln,
        customerGln,
        saveGln,
        userId,
        name,
      });
      if (response.error) {
        showAlert(
          response.data ? response.data : 'Error converting/uploading PDF',
          'tomato'
        );
        return;
      } else {
        // sets the latest data to zustand and state
        showAlert('PDF successfully converted to UBL', 'green');
        const data = {
          _id: response.newObjectId,
          date: response.date,
          pdfId: response.pdfId,
          ublId: response.ublId,
          validatorId: response.validatorId,
          name,
        };

        console.log(data, 'DATATATATATATATATTATAATATATATATATATAT');

        setPdfs((prevPdfs) => [...prevPdfs, data]);
        addPdfData(data);
      }
      console.log(response);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormTitle>UBL Invoice Form</FormTitle>

        <FlexContainer>
          <InputGroup>
            <Label>
              Invoice Number: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              type="text"
              name="invoice_number"
              value={invoice.invoice_number}
              onChange={handleChange}
            />
            {errors.invoice_number && (
              <ErrorMessage>{errors.invoice_number}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>
              Issue Date: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              type="date"
              name="date"
              value={invoice.date}
              onChange={handleChange}
            />
            {errors.date && <ErrorMessage>{errors.date}</ErrorMessage>}
          </InputGroup>
        </FlexContainer>

        <FlexContainer>
          <InputGroup>
            <Label>
              Due Date: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              type="date"
              name="due_date"
              value={invoice.due_date}
              onChange={handleChange}
            />
            {errors.due_date && <ErrorMessage>{errors.due_date}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Purchase Order Number:</Label>
            <Input
              type="text"
              name="purchase_order_number"
              value={invoice.purchase_order_number}
              onChange={handleChange}
            />
          </InputGroup>
        </FlexContainer>

        <FlexContainer>
          <InputGroup>
            <Label>
              Subtotal: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              type="number"
              name="subtotal"
              value={invoice.subtotal}
              onChange={handleChange}
            />
            {errors.subtotal && <ErrorMessage>{errors.subtotal}</ErrorMessage>}
          </InputGroup>

          <InputGroup>
            <Label>Tax:</Label>
            <Input
              type="number"
              name="tax"
              value={invoice.tax}
              onChange={handleChange}
            />
          </InputGroup>
        </FlexContainer>

        <InputGroup>
          <Label>
            Total: <span style={{ color: 'red' }}>*</span>
          </Label>
          <Input
            type="number"
            name="total"
            value={invoice.total}
            onChange={handleChange}
          />
          {errors.total && <ErrorMessage>{errors.total}</ErrorMessage>}
        </InputGroup>

        <SectionTitle>Vendor Information</SectionTitle>
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

        <SectionTitle>Customer Information</SectionTitle>
        <FlexContainer>
          <InputGroup>
            <Label>
              Name: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              type="text"
              name="name"
              value={invoice.customer.name}
              onChange={handleCustomerChange}
            />
            {errors['customer.name'] && (
              <ErrorMessage>{errors['customer.name']}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>
              Address: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              type="text"
              name="address"
              value={invoice.customer.address}
              onChange={handleCustomerChange}
            />
            {errors['customer.address'] && (
              <ErrorMessage>{errors['customer.address']}</ErrorMessage>
            )}
          </InputGroup>

          <InputGroup>
            <Label>
              VAT Number: <span style={{ color: 'red' }}>*</span>
            </Label>
            <Input
              type="text"
              name="vat_number"
              value={invoice.customer.vat_number}
              onChange={handleCustomerChange}
            />
            {errors['customer.vat_number'] && (
              <ErrorMessage>{errors['customer.vat_number']}</ErrorMessage>
            )}
          </InputGroup>
        </FlexContainer>

        <SectionTitle>Line Items</SectionTitle>
        {invoice.line_items.map((item, index) => (
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
                  <ErrorMessage>
                    {errors[`line_items[${index}].id`]}
                  </ErrorMessage>
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
                  <ErrorMessage>
                    {errors[`line_items[${index}].total`]}
                  </ErrorMessage>
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
                  <ErrorMessage>
                    {errors[`line_items[${index}].price`]}
                  </ErrorMessage>
                )}
              </InputGroup>
            </FlexContainer>

            {invoice.line_items.length > 1 && (
              <DeleteButton
                type="button"
                onClick={() => {
                  if (
                    window.confirm('Are you sure you want to delete this item?')
                  ) {
                    deleteLineItem(index);
                  }
                }}
              >
                Delete Item
              </DeleteButton>
            )}
          </div>
        ))}

        <AddButton type="button" onClick={addLineItem}>
          Add Line Item
        </AddButton>

        <div>
          <CustomInputBox
            value={name}
            setValue={setName}
            type="text"
            label="File Name"
            placeholder="File A"
            additionalStyles={{ width: '80%' }}
          />
          <div style={{ position: 'relative', marginTop: '30px' }}>
            <CustomInputBox
              value={vendorGln}
              setValue={setVendorGln}
              type="text"
              label="Your GLN"
              placeholder="1234567898765"
              additionalStyles={{ width: '80%' }}
            />
            <Tooltip title="(GLN) is a unique identifier used to identify physical locations, legal entities, or functions within a company (13-digit long number). GS1 Standards.">
              <InfoIcon
                style={{
                  position: 'absolute',
                  right: '15%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>
          </div>
          <div style={{ position: 'relative', marginTop: '30px' }}>
            <CustomInputBox
              value={customerGln}
              setValue={setCustomerGln}
              type="text"
              label="Customer GLN"
              placeholder="9876543212345"
              additionalStyles={{ width: '80%' }}
            />
            <Tooltip title="(GLN) is a unique identifier used to identify physical locations, legal entities, or functions within a company (13-digit long number). GS1 Standards.">
              <InfoIcon
                style={{
                  position: 'absolute',
                  right: '15%',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              />
            </Tooltip>
          </div>
          <FormControlLabel
            style={{ marginLeft: '5px' }}
            control={
              <Checkbox
                checked={saveGln}
                onChange={(e) => setSaveGln(e.target.checked)}
                name="saveGln"
              />
            }
            label="Save your GLN for future uploads"
          />
        </div>

        <SubmitButton
          disabled={
            name === '' || vendorGln.length !== 13 || customerGln.length !== 13
          }
          type="submit"
        >
          Submit
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default GuiForm;
