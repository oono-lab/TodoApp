import React from 'react';

interface BackgroundProps {
  children: React.ReactNode;
  backgroundImage?: string;
  overlayOpacity?: number;
}

const Background: React.FC<BackgroundProps> = ({
  children,
  backgroundImage = "",
  overlayOpacity = 0.3
}) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url("${backgroundImage}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}
    >
      {/* オーバーレイ */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
          zIndex: 1,
        }}
      />

      {/* メインコンテンツ */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
};

export default Background;