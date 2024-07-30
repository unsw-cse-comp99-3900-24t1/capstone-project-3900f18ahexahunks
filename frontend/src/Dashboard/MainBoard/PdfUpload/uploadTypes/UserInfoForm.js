import { Checkbox, FormControlLabel, Tooltip } from '@mui/material';
import CustomInputBox from '../../../../components/CustomInputBox';
import InfoIcon from '@mui/icons-material/Info';

const UserInfoForm = ({
  name,
  setName,
  vendorGln,
  setVendorGln,
  customerGln,
  setCustomerGln,
  saveGln,
  setSaveGln,
}) => {
  return (
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
  );
};
export default UserInfoForm;
