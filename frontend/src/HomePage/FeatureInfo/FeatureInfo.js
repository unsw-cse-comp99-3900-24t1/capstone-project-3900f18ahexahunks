import React from 'react';
import { styled } from '@mui/system';

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

const ProductHeading = styled('h1')({
  fontSize: '2.5rem',
  color: '#fff',
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

const ProductCard = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  margin: '20px',
  border: '2px solid #fff',
  padding: '20px',
  borderRadius: '10px',
  width: '400px',
  boxSizing: 'border-box',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Add transition for smooth effect
  '&:hover': {
    transform: 'scale(1.05)', // Scale up on hover
    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)', // Add subtle shadow on hover
  },
  '@media (max-width: 750px)': {
    width: '80%', // Adjust width for small screens
  },
});

const ProductImage = styled('div')({
  width: '150px',
  height: '150px',
  borderRadius: '50%',
  backgroundColor: '#ddd',
  marginBottom: '20px',
  //   backgroundImage: `url(${imageURl}})`,
  //   backgroundSize: 'cover',
  //   backgroundPosition: 'center',
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
        <ProductCard>
          <ProductImage />
          <ProductInfo>
            <h3>Convert</h3>
            <p>
              Create electronic invoices by converting data from various sources
              (CSV, SQL, PDF, or manual input) into UBL 2.1 XML format using our
              API.{' '}
            </p>
          </ProductInfo>
        </ProductCard>
        <ProductCard>
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
        <ProductCard>
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
