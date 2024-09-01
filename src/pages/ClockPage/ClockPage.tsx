import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AnalogClock from '~/components/AnalogClock';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserPage: React.FC = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <Container>
      <AnalogClock time={time} />
      Current time: {time.toLocaleTimeString()}
      
    </Container>
    </>
  );
};

export default UserPage;