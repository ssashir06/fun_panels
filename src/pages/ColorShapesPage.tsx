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
`;

const ShapeWrapper = styled.div<{ isVisible: boolean }>`
  opacity: ${props => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
`;

const ColorShapesPage: React.FC = () => {
  const [shapes, setShapes] = useState<ColorfulShapeProps[]>([]);
  const [visibleShapes, setVisibleShapes] = useState<ColorfulShapeProps[]>([]);

  const handleAdd = () => {
    const all = ['red', 'green', 'blue'].map(color => (
      ['circle', 'square', 'triangle'].map(type => ({ type, color } as ColorfulShapeProps))
    )).flat();
    const newShape: ColorfulShapeProps = all[Math.floor(Math.random() * all.length)];
    setShapes([...shapes, newShape]);
    setTimeout(() => {
      setVisibleShapes([...shapes, newShape]);
    }, 10); // Short delay to trigger the fade-in animation
  };

  const handleRemove = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, shape: ColorfulShapeProps) => {
    ev.stopPropagation();
    setVisibleShapes(visibleShapes.filter(s => s !== shape));
    setTimeout(() => {
      setShapes(shapes.filter(s => s !== shape));
    }, 500); // Match the transition duration
  };

  return (
    <>
      <Helmet>
        <title>Color home</title>
      </Helmet>
      <Container>
        <Row>
          {shapes.map((shape, index) => (
            <ShapeWrapper key={index} isVisible={visibleShapes.includes(shape)}>
              <ColorfulShape {...shape} onClick={(ev) => handleRemove(ev, shape)} />
            </ShapeWrapper>
          ))}
        </Row>
        <Row>
          <button onClick={handleAdd}>+</button>
        </Row>
      </Container>
    </>
  );
};

export default ColorShapesPage;