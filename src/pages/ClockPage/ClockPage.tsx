import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import AnalogClock from '~/components/AnalogClock';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const UserPage: React.FC = () => {
  const [time, setTime] = useState(new Date());
  const [prefferedTime, setPrefferedTime] = useState('00:00');
  const [showNowTime, setShowNowTime] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    if (showNowTime) {
      setTime(new Date());
    }
    const interval = setInterval(() => {
      if (showNowTime) {
        setTime(new Date());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [showNowTime]);

  const moveTime = async () => {
    const getMilleseconds = (hours: number, minutes: number, seconds: number) => {
      return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
    }
    const fastFrequency = 1000 / 10;
    const normalFrequency = 1000 / 5;
    const slowFrequency = 1000 / 3;

    const [hours, minutes] = prefferedTime.split(':').map((unit) => parseInt(unit, 10));
    const newTime = new Date(time);
    newTime.setHours(hours);
    newTime.setMinutes(minutes);
    newTime.setSeconds(0);

    if (newTime < time) {
      newTime.setDate(newTime.getDate() + 1);
    }

    let timeMoving = new Date(time);

    setIsMoving(true);
    while (timeMoving < newTime) {
      let sleepTime = 1000;

      if (timeMoving.getTime() < newTime.getTime() - getMilleseconds(1, 0, 0)) {
        sleepTime = fastFrequency;
        timeMoving = new Date(timeMoving.getTime() + getMilleseconds(0, 5, 0));
      } else if (timeMoving.getTime() < newTime.getTime() - getMilleseconds(0, 5, 0)) {
        sleepTime = normalFrequency;
        timeMoving = new Date(timeMoving.getTime() + getMilleseconds(0, 5, 0));
      } else if (timeMoving.getTime() < newTime.getTime() - getMilleseconds(0, 1, 0)) {
        sleepTime = fastFrequency;
        timeMoving = new Date(timeMoving.getTime() + getMilleseconds(0, 0, 1));
      } else {
        sleepTime = slowFrequency;
        timeMoving = new Date(timeMoving.getTime() + getMilleseconds(0, 0, 1));
      }

      setTime(timeMoving < newTime ? timeMoving : newTime);
      await new Promise((resolve) => setTimeout(resolve, sleepTime));
    }
    setIsMoving(false);
  };

  return (
    <>
      <Container>
        <Row>
          { time.toLocaleTimeString() }
          { time.getHours() > 6 && time.getHours() < 18 ? '🌞' : '🌙' }
        </Row>
        <Row>
          <AnalogClock time={time} />
        </Row>
      </Container>
      <Container>
        <Row>
          <input type="time" value={prefferedTime} onChange={(e) => setPrefferedTime(e.target.value)} />
          <button onClick={async () =>{ setShowNowTime(false); await moveTime(); }}>Set time</button>
          <button onClick={() => setShowNowTime(true)} disabled={isMoving}>Use real time</button>
        </Row>
      </Container>
    </>
  );
};

export default UserPage;