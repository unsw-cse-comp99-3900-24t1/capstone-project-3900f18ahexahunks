import React, { useState } from 'react';
import { styled } from '@mui/system';
import { guiFormToUblConvert } from '../../../../services/api';
import useUserStore from '../../../../zustand/useUserStore';
import { useAlert } from '../../../../components/AlertError';
import usePdfStore from '../../../../zustand/usePdfStore';
import UserInfoForm from './UserInfoForm';
import InvoiceLineItem from './InvoiceLineItem';
import CustomerInformation from './CustomerInformation';
import VendorInformation from './VendorInformation';
import InvoiceFormInputs from './InvoiceFormInputs';

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
    invoice_number: '',
    date: '',
    due_date: '',
    purchase_order_number: '',
    subtotal: '',
    tax: '',
    total: '',
    vendor: {
      name: '',
      address: '',
      vat_number: '',
    },
    customer: {
      name: '',
      address: '',
      vat_number: '',
    },
    line_items: [
      { id: '', quantity: '', total: '', description: '', price: '' },
    ],
  });
  const { getUser } = useUserStore();
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
          response.data.error
            ? response.data.error
            : 'Error converting/uploading PDF',
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
          validationHtml: response.validationHtml,
          validationJson: response.validationJson,
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
          <InvoiceFormInputs
            label={`Invoice Number: `}
            type={'text'}
            name={'invoice_number'}
            value={invoice.invoice_number}
            handleChange={handleChange}
            error={errors.invoice_number}
            required={true}
          />
          <InvoiceFormInputs
            label={`Issue Date: `}
            type={'date'}
            name={'date'}
            value={invoice.date}
            handleChange={handleChange}
            error={errors.date}
            required={true}
          />
        </FlexContainer>

        <FlexContainer>
          <InvoiceFormInputs
            label={`Due Date: `}
            type={'date'}
            name={'due_date'}
            value={invoice.due_date}
            handleChange={handleChange}
            error={errors.due_date}
            required={true}
          />
          <InvoiceFormInputs
            label={`Purchase Order Number:`}
            type={'text'}
            name={'purchase_order_number'}
            value={invoice.purchase_order_number}
            handleChange={handleChange}
            required={false}
          />
        </FlexContainer>

        <FlexContainer>
          <InvoiceFormInputs
            label={`Subtotal: `}
            type={'number'}
            name={'subtotal'}
            value={invoice.subtotal}
            handleChange={handleChange}
            error={errors.subtotal}
            required={true}
          />
          <InvoiceFormInputs
            label={`Tax:`}
            type={'number'}
            name={'tax'}
            value={invoice.tax}
            handleChange={handleChange}
            required={false}
          />
        </FlexContainer>
        <InvoiceFormInputs
          label={`Total: `}
          type={'number'}
          name={'total'}
          value={invoice.total}
          handleChange={handleChange}
          error={errors.total}
          required={true}
        />

        <SectionTitle>Vendor Information</SectionTitle>
        <VendorInformation
          invoice={invoice}
          handleVendorChange={handleVendorChange}
          errors={errors}
        />

        <SectionTitle>Customer Information</SectionTitle>
        <CustomerInformation
          invoice={invoice}
          handleCustomerChange={handleCustomerChange}
          errors={errors}
        />

        <SectionTitle>Line Items</SectionTitle>
        {invoice.line_items.map((item, index) => (
          <InvoiceLineItem
            index={index}
            item={item}
            handleLineItemChange={handleLineItemChange}
            errors={errors}
            invoice={invoice}
            deleteLineItem={deleteLineItem}
          />
        ))}

        <AddButton type="button" onClick={addLineItem}>
          Add Line Item
        </AddButton>

        <UserInfoForm
          name={name}
          setName={setName}
          vendorGln={vendorGln}
          setVendorGln={setVendorGln}
          customerGln={customerGln}
          setCustomerGln={setCustomerGln}
          saveGln={saveGln}
          setSaveGln={setSaveGln}
        />

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
