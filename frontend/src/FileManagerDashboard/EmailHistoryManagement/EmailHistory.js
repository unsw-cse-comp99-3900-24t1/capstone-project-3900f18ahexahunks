import { useParams } from 'react-router-dom';
import useUserStore from '../../zustand/useUserStore';
import { useEffect, useState } from 'react';
import { getHistoryEmailById } from '../../services/api';
import { Typography } from '@mui/material';
import EmailHistoryCard from './EmailHistoryCard';

const EmailHistory = () => {
  const { id } = useParams();
  const { getUser } = useUserStore();
  const user = getUser();
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function getData() {
      const res = await getHistoryEmailById({
        userId: user._id,
        shareObjId: id,
      });

      console.log(res);

      if (res.error) {
        // Handle error case
        console.error(res.error);
      } else {
        setEmails(res);
      }
    }
    getData();
  }, [id, user._id]);

  return (
    <div
      style={{
        height: '90vh',
        overflow: 'auto',
        width: '80vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          height: '90vh',
          overflow: 'auto',
          width: '70vw',
        }}
      >
        <h2>Email History</h2>
        {emails.length > 0 ? (
          emails.map((email) => (
            <EmailHistoryCard key={email._id} email={email} />
          ))
        ) : (
          <Typography>No email history found.</Typography>
        )}
      </div>
    </div>
  );
};

export default EmailHistory;
