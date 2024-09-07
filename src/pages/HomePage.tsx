import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: calc(100vh - 2em);
  justify-content: center;
  align-items: center;
`;

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Fun panels home</title>
      </Helmet>
      <Container>
        Fun panels
      </Container>
    </>
  );
};

export default HomePage;