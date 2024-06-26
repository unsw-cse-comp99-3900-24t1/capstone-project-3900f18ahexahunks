import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledLink = styled(Link)(({ isSelected }) => ({
  display: 'block',
  backgroundColor: isSelected ? '#651FFF' : '#FFF',
  color: isSelected ? '#FFF' : '#000',
  textDecoration: 'none',
  padding: '10px 20px',
  cursor: 'pointer',
  marginBottom: '10px',
  borderRadius: '4px',
  textAlign: 'center',
  '&:hover': {
    backgroundColor: isSelected ? '#651FFF' : '#f0f0f0',
  },
}));

const SelectorLinks = ({
  routeTo,
  text,
  isSelected,
  onClick,
  additionalStyle,
}) => {
  return (
    <StyledLink
      to={routeTo}
      isSelected={isSelected}
      onClick={onClick}
      style={additionalStyle}
    >
      {text}
    </StyledLink>
  );
};

export default SelectorLinks;
