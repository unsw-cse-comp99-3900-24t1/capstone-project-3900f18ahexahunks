// const Selector = () => {
//   return <div>Selector</div>;
// };
// expor default Selector;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Selector = () => {
  // const classes = useStyles();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove('token', { path: '/' });
    localStorage.clear();
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
          <Link to="/dashboard/main">Dashboard</Link>
        </button>
        <button>
          <Link to="/dashboard/validate">Validate</Link>
        </button>
        <button>
          <Link to="/dashboard/convert">Invoices</Link>
        </button>
        <button>
          <Link to="/settings">Settings</Link>
        </button>
        <button>
          <Link to="/help">Help</Link>
        </button>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </div>
  );
};

export default Selector;
