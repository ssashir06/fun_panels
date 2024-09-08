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
  flex-wrap: wrap;
  margin: 1em;
`;

const ShapeWrapper = styled.div<{ isVisible: boolean }>`
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transform: ${props => (props.isVisible ? 'scaleX(1)' : 'scaleX(0)')};
  width: ${props => (props.isVisible ? '100px' : '0')};
  margin-left: ${props => (props.isVisible ? '0.5em' : '0')};
  margin-right: ${props => (props.isVisible ? '0.5em' : '0')};
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  transform-origin: center;
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out, width 0.5s ease-in-out, margin-left 0.5s ease-in-out, margin-right 0.5s ease-in-out;
  overflow: hidden; /* Ensure content is hidden when width is 0 */
`;

const AddButton = styled.button<{ enabled: boolean }>`
  font-size: 2rem; /* Large font size */
  padding: 10px 20px;
  background-color: gray;
  color: black;
  border: 2px solid ${props => (props.enabled ? 'black' : 'gray')};
  border-radius: 10px;
  cursor: pointer;
  width: 2em;
  height: 2em;
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
      { type: 'triangle', color: 'red', speak: '赤いさんかく' },
      { type: 'triangle', color: 'green', speak: '緑のさんかく' },
      { type: 'triangle', color: 'blue', speak: '青いさんかく' },
    ] as (ColorfulShapeProps & { speak: string })[],
  };

  const [shapes, setShapes] = useState<EnhancedColorfulShapeProps[]>([]);
  const [visibleShapes, setVisibleShapes] = useState<EnhancedColorfulShapeProps[]>([]);
  const [isMoving, setIsMoving] = useState(false);

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

    // Mark as moving 1500ms
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
    }, 1500);

    setShapes([...shapes, newShape]);
    setTimeout(() => {
      setVisibleShapes([...shapes, newShape]);
    }, 10); // Short delay to trigger the fade-in animation
    speak(newShape, 'ja-JP');
  };

  const handleRemove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, shape: ColorfulShapeProps) => {
    ev.stopPropagation();
    
    // Mark as moving 1500ms
    setIsMoving(true);
    setTimeout(() => {
      setIsMoving(false);
    }, 1500);

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
          { shapes.length < 5 && !isMoving? 
            <AddButton onClick={handleAdd} enabled={true}>+</AddButton> :
            <AddButton enabled={false} />
          }
        </Row>
        <Row>
          {shapes.map((shape) => (
            <ShapeWrapper key={shape.id} isVisible={visibleShapes.includes(shape)}>
              <ColorfulShape {...shape} onClick={(ev) => !isMoving && handleRemove(ev, shape)} />
            </ShapeWrapper>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ColorShapesPage;