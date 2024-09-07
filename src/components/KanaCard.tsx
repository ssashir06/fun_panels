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
  return (
    <Card>
      { kana && <Letter>{kana}</Letter> }
      { romaji && <Romaji>{romaji}</Romaji> }
    </Card>
  );
};

export default KanaCard;
