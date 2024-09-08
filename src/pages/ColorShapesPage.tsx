import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import ColorfulShape, { ColorfulShapeProps } from '~/components/ColorfulShape';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 1em;
`;

const ShapeWrapper = styled.div<{ isVisible: boolean }>`
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props => (props.isVisible ? 'scaleX(1)' : 'scaleX(0)')};
  transform-origin: center;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  margin: 0.5em;
  overflow: hidden; /* Ensure content is hidden when width is 0 */
`;

const AddButton = styled.button`
  font-size: 2rem; /* Large font size */
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ColorShapesPage: React.FC = () => {
  interface EnhancedColorfulShapeProps extends ColorfulShapeProps {
    id: number;
  };

  const allColorfulShapes = ['red', 'green', 'blue'].map(color => (
    ['circle', 'square', 'triangle'].map(type => ({ type, color } as ColorfulShapeProps))
  )).flat();

  const languageMapping = {
    'ja-JP': [
      { type: 'circle', color: 'red', speak: '赤い丸' },
      { type: 'circle', color: 'green', speak: '緑の丸' },
      { type: 'circle', color: 'blue', speak: '青い丸' },
      { type: 'square', color: 'red', speak: '赤い四角' },
      { type: 'square', color: 'green', speak: '緑の四角' },
      { type: 'square', color: 'blue', speak: '青い四角' },
      { type: 'triangle', color: 'red', speak: '赤い三角' },
      { type: 'triangle', color: 'green', speak: '緑の三角' },
      { type: 'triangle', color: 'blue', speak: '青い三角' },
    ] as (ColorfulShapeProps & { speak: string })[],
  };

  const [shapes, setShapes] = useState<EnhancedColorfulShapeProps[]>([]);
  const [visibleShapes, setVisibleShapes] = useState<EnhancedColorfulShapeProps[]>([]);

  const speak = (shape: ColorfulShapeProps, lang: 'ja-JP') => {
    const text = languageMapping[lang]?.find(s => s.type === shape.type && s.color === shape.color)?.speak;
    if (!text) {
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = lang;
    speechSynthesis.speak(speech);
  }

  const handleAdd = () => {
    const newShape: EnhancedColorfulShapeProps = {
      ...allColorfulShapes[Math.floor(Math.random() * allColorfulShapes.length)],
      id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
    };
    setShapes([newShape, ...shapes]);
    setTimeout(() => {
      setVisibleShapes([...shapes, newShape]);
    }, 10); // Short delay to trigger the fade-in animation
    speak(newShape, 'ja-JP');
  };

  const handleRemove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, shape: ColorfulShapeProps) => {
    ev.stopPropagation();
    setVisibleShapes(visibleShapes.filter(s => s !== shape));
    setTimeout(() => {
      setShapes(shapes.filter(s => s !== shape));
    }, 500); // Match the transition duration
    speak(shape, 'ja-JP');
  };

  return (
    <>
      <Helmet>
        <title>Color and Shapes</title>
      </Helmet>
      <Container>
        <Row>
          <AddButton onClick={handleAdd}>+</AddButton>
        </Row>
        <Row>
          {shapes.map((shape) => (
            <ShapeWrapper key={shape.id} isVisible={visibleShapes.includes(shape)}>
              <ColorfulShape {...shape} onClick={(ev) => handleRemove(ev, shape)} />
            </ShapeWrapper>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ColorShapesPage;