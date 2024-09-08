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
  transition: opacity 0.5s ease-in-out;
  margin: 0.5em;
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

  const [shapes, setShapes] = useState<EnhancedColorfulShapeProps[]>([]);
  const [visibleShapes, setVisibleShapes] = useState<EnhancedColorfulShapeProps[]>([]);

  const handleAdd = () => {
    const all = ['red', 'green', 'blue'].map(color => (
      ['circle', 'square', 'triangle'].map(type => ({ type, color } as ColorfulShapeProps))
    )).flat();
    const newShape: EnhancedColorfulShapeProps = {
      ...all[Math.floor(Math.random() * all.length)],
      id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
    };
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