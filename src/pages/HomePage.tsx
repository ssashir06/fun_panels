import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  height: calc(100vh - 2em);
  justify-content: center;
  align-items: center;
`;

const HomePage: React.FC = () => {
  return (
    <Container>
      Fun panels
    </Container>
  );
};

export default HomePage;