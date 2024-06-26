import { Link } from 'react-router-dom';

const SelectorLinks = ({ routeTo, text }) => {
  return (
    <button>
      <Link to={routeTo}>{text}</Link>
    </button>
  );
};
export default SelectorLinks;
