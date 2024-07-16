import React from 'react';
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { background-color: rgba(255, 255, 255, 0.1); }
  50% { background-color: rgba(255, 255, 255, 0.3); }
  100% { background-color: rgba(255, 255, 255, 0.1); }
`;

const ProductShowcaseSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '50px 0',
  '@media (max-width: 750px)': {
    padding: '20px 0',
  },
});

const ProductHeadingContainer = styled('div')({
  marginBottom: '20px',
  textAlign: 'center',
});

const glow = keyframes`
  from { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #E60073, 0 0 40px #E60073, 0 0 50px #E60073, 0 0 60px #E60073, 0 0 70px #E60073; }
  to { text-shadow: 0 0 20px #fff, 0 0 30px #FF1177, 0 0 40px #FF1177, 0 0 50px #FF1177, 0 0 60px #FF1177, 0 0 70px #FF1177, 0 0 80px #FF1177; }
`;

const ProductHeading = styled('h1')({
  fontSize: '2.5rem',
  color: '#fff',
  animation: `${glow} 2.5s ease-in-out infinite alternate`,
});

const ProductCardsContainer = styled('div')({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  width: '100%',
  flexWrap: 'wrap',
  '@media (max-width: 750px)': {
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const ProductCard = styled('div')(({ theme, hoverColor }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  margin: '20px',
  border: '2px solid black',
  padding: '20px',
  borderRadius: '10px',
  width: '400px',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  transition: 'all 0.5s ease', // Slowed down from 0.3s to 0.5s
  animation: `${fadeIn} 1.5s ease-out`, // Slowed down from 1s to 1.5s
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
    borderColor: hoverColor,
    animation: `${pulse} 3s infinite ease-in-out`, // Slowed down from 2s to 3s
  },
  '@media (max-width: 750px)': {
    width: '80%',
  },
}));

const ProductImage = styled('div')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  backgroundColor: '#ddd',
  marginBottom: '20px',
});

const ProductInfo = styled('div')({
  fontSize: '1rem',
  color: '#fff',
});

const FeatureInfo = () => {
  return (
    <ProductShowcaseSection>
      <ProductHeadingContainer>
        <ProductHeading>Our Product Features...</ProductHeading>
      </ProductHeadingContainer>
      <ProductCardsContainer>
        <ProductCard hoverColor="#ff6f61">
          <ProductImage />
          <ProductInfo>
            <h3>Convert</h3>
            <p>
              Create electronic invoices by converting data from various sources
              (CSV, SQL, PDF, or manual input) into UBL 2.1 XML format using our
              API.
            </p>
          </ProductInfo>
        </ProductCard>
        <ProductCard hoverColor="#4caf50">
          <ProductImage />
          <ProductInfo>
            <h3>Validate</h3>
            <p>
              Validate UBL 2.1 XML invoices using our API, providing detailed
              reports in JSON, PDF, or HTML on rule compliance and indicating
              any validation errors.
            </p>
          </ProductInfo>
        </ProductCard>
        <ProductCard hoverColor="#2196f3">
          <ProductImage />
          <ProductInfo>
            <h3>Share</h3>
            <p>
              Send UBL invoices via email using our API, with detailed
              communication reports in JSON, HTML, or PDF formats indicating
              delivery success or failure.
            </p>
          </ProductInfo>
        </ProductCard>
      </ProductCardsContainer>
    </ProductShowcaseSection>
  );
};

export default FeatureInfo;
