
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: Arial, sans-serif;
`;

const App: React.FC = () => {
  return (
    <Container>
      Fun panels
    </Container>
  );
};

export default App;