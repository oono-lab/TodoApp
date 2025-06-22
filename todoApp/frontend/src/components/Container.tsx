import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, 10%)',
        width: '600px',
        maxWidth: '100vw',
        border: '2px solid white',
        borderRadius: '36px',
        padding: '24px',
        backgroundColor: 'transparent',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
};

export default Container;