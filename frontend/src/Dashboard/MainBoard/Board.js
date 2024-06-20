// import React from 'react';
// import useUserStore from '../../zustand/useUserStore';
// import Weather from './Weather';
// import ThoughtOfTheDay from './ThoughtOfTheDay';

// const Board = () => {
//   // Get the 'process' parameter from the route
//   // const { process } = useParams();

//   const { getUser } = useUserStore();

//   return (
//     <div>
//       <h1>G'Day {getUser().username}</h1>
//       <h1>Welcome Back to your personal E-manager</h1>
//       <Weather />
//       <ThoughtOfTheDay />
//     </div>
//   );
// };

// export default Board;
import React from 'react';
import { styled } from '@mui/material/styles';
import useUserStore from '../../zustand/useUserStore';
import Weather from './Weather';
import ThoughtOfTheDay from './ThoughtOfTheDay';

const BoardContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  maxWidth: '800px',
  margin: '0 auto',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'normal',
  justifyContent: 'space-around',
  height: '80vh',
}));

const Heading = styled('h1')(({ theme }) => ({
  color: '#000',
  margin: theme.spacing(2, 0),
  // marginTop: '10vh',
}));

const SubHeading = styled('h1')(({ theme }) => ({
  color: '#000',
  margin: theme.spacing(1, 0),
  // marginBottom: '10vh',
}));

const Board = () => {
  const { getUser } = useUserStore();

  return (
    <BoardContainer>
      <Weather />
      <div>
        <Heading>
          G'Day <span style={{ color: '#651FFF' }}>{getUser().username}</span>
        </Heading>
        <SubHeading>Welcome Back to your personal E-manager</SubHeading>
      </div>
      <ThoughtOfTheDay />
    </BoardContainer>
  );
};

export default Board;
