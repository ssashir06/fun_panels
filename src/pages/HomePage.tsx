import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import useUserName from '~/hooks/useUserName';

const Container = styled.div`
  display: flex;
  height: calc(100vh - 2em);
  justify-content: center;
  align-items: center;
`;

const HomePage: React.FC = () => {
  const { userName } = useUserName();

  return (
    <>
      <Helmet>
        <title>Fun panels home</title>
      </Helmet>
      <Container>
        Fun panels
        <br />
        Hello {userName}!
      </Container>
    </>
  );
};

export default HomePage;
