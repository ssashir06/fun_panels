import React, { useEffect, useState } from 'react';

const AnalogClock: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRotationDegrees = (unit: number, max: number) => (unit / max) * 360 + 90;

  const secondsDegrees = getRotationDegrees(time.getSeconds(), 60);
  const minutesDegrees = getRotationDegrees(time.getMinutes(), 60);
  const hoursDegrees = getRotationDegrees(time.getHours() % 12, 12);

  return (
    <div style={styles.clock}>
      <div style={{ ...styles.hand, ...styles.hourHand, transform: `rotate(${hoursDegrees}deg)` }} />
      <div style={{ ...styles.hand, ...styles.minuteHand, transform: `rotate(${minutesDegrees}deg)` }} />
      <div style={{ ...styles.hand, ...styles.secondHand, transform: `rotate(${secondsDegrees}deg)` }} />
      <div style={{ ...styles.hourLabel, ...styles.label3 }}>3</div>
      <div style={{ ...styles.hourLabel, ...styles.label6 }}>6</div>
      <div style={{ ...styles.hourLabel, ...styles.label9 }}>9</div>
      <div style={{ ...styles.hourLabel, ...styles.label12 }}>12</div>
    </div>
  );
};

const styles = {
  clock: {
    position: 'relative' as const,
    width: '200px',
    height: '200px',
    border: '2px solid black',
    borderRadius: '50%',
    margin: '20px auto',
  },
  hand: {
    position: 'absolute' as const,
    width: '50%',
    height: '2px',
    backgroundColor: 'black',
    top: '50%',
    transformOrigin: '100%',
  },
  hourHand: {
    height: '4px',
    width: '30%',
    left: '20%',
    backgroundColor: 'black',
  },
  minuteHand: {
    height: '3px',
    backgroundColor: 'black',
  },
  secondHand: {
    height: '2px',
    width: '40%',
    left: '10%',
    backgroundColor: 'red',
  },
  hourLabel: {
    position: 'absolute' as const,
    fontSize: '16px',
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    width: '20px',
    height: '20px',
  },
  label3: {
    top: '50%',
    left: '90%',
    transform: 'translate(-50%, -50%)',
  },
  label6: {
    top: '90%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  label9: {
    top: '50%',
    left: '10%',
    transform: 'translate(-50%, -50%)',
  },
  label12: {
    top: '10%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default AnalogClock;