// const Selector = () => {
//   return <div>Selector</div>;
// };
// expor default Selector;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Selector = () => {
  // const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform any necessary logout logic here, like clearing authentication tokens
    navigate('/');
  };
  return (
    <div>
      <h1>
        <img
          src={`${process.env.PUBLIC_URL}/Path_1929.png`}
          alt="icon"
          style={{
            width: '50px',
            height: '50px',
            verticalAlign: 'middle',
            marginRight: '8px',
          }}
        />
        Hexa Hunks
      </h1>
      <nav>
        <button>
          <Link to="Dashboard">Dashboard</Link>
        </button>
        <button>
          <Link to="Validate">Validate</Link>
        </button>
        <button>
          <Link to="Invoices">Invoices</Link>
        </button>
        <button>
          <Link to="Settings">Settings</Link>
        </button>
        <button>
          <Link to="Help">Help</Link>
        </button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Selector;
