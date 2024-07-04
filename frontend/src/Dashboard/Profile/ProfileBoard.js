// import React, { useState } from 'react';
// import Modal from './Modal'; // Assuming you have a Modal component
// import { Card, CardHeader, CardMedia, Button } from '@mui/material';
// import { styled } from '@mui/system';
// import useUserStore from '../../zustand/useUserStore';

// const ProfilePicture = styled(CardMedia)({
//   maxWidth: 150,
//   cursor: 'pointer',
// });

// const ProfileBoard = () => {
//   const [showModal, setShowModal] = useState(false);
//   const getUser = useUserStore((state) => state.getUser);
//   const user = getUser();

//   const openModal = () => {
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <Card>
//       <CardHeader title="Profile Board" />
//       <ProfilePicture
//         component="img"
//         image={user.googlePicture}
//         alt="Profile"
//         onClick={openModal}
//       />
//       {showModal && <Modal closeModal={closeModal} />}
//     </Card>
//   );
// };

// export default ProfileBoard;
import React, { useState } from 'react';
import Modal from './Modal'; // Assuming you have a Modal component
import { Card, CardHeader, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import useUserStore from '../../zustand/useUserStore';

const ProfilePicture = styled(CardMedia)({
  maxWidth: 150,
  cursor: 'pointer',
});

const ProfileBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const getUser = useUserStore((state) => state.getUser);
  const user = getUser();

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <Card>
      <CardHeader title="Profile Board" />
      <ProfilePicture
        component="img"
        src={`http://localhost:5003/api/images/${user.googlePicture}`} // Replace YOUR_PORT with your actual backend server port
        alt="Profile"
        onClick={openModal}
      />
      {showModal && <Modal closeModal={closeModal} />}
    </Card>
  );
};

export default ProfileBoard;
