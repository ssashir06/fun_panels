import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  transition: background-color 1s;
  background-color: white;
`;

const Letter = styled.div`
  font-size: 38px;
`;

const Romaji = styled.div`
  font-size: 14px;
`;

interface KanaCardProps {
  kana: string | null;
  romaji: string | null;
};

const KanaCard: React.FC<KanaCardProps> = ({ kana, romaji }) => {
  const handleSpeak = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (kana) {
      const utterance = new SpeechSynthesisUtterance(`${kana}!`);
      utterance.lang = 'ja-JP';
      speechSynthesis.speak(utterance);

      const cardElement = ev.currentTarget;
      cardElement.style.backgroundColor = 'orange';
      setTimeout(() => {
        cardElement.style.backgroundColor = 'white';
      }, 1000);
    }
  };

  return (
    <Card onClick={handleSpeak}>
      { kana && <Letter>{kana}</Letter> }
      { romaji && <Romaji>{romaji}</Romaji> }
    </Card>
  );
};

export default KanaCard;