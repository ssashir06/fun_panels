import React from 'react';

interface ColorfulShapeProps {
  type: 'circle' | 'square' | 'triangle';
  color: 'red' | 'green' | 'blue';
  onClick?: (ev: React.MouseEvent<HTMLDivElement>) => void;
}

const ColorfulShape: React.FC<ColorfulShapeProps> = ({ type, color, onClick }) => {
  const shapeStyles = {
    width: '100px',
    height: '100px',
    backgroundColor: color,
    borderRadius: type === 'circle' ? '50%' : '0',
    clipPath: type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
  };

  return <div style={shapeStyles} onClick={onClick} />;
};

export { ColorfulShapeProps };
export default ColorfulShape;