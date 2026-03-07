import {useState} from 'react';
import type {CSSProperties} from 'react';

interface GifViewerProps {
  src: string;
  alt: string;
}

export default function GifViewer({src, alt}: GifViewerProps): JSX.Element {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsFullscreenState] = useState(false);

  const handleImageClick = () => {
    setIsFullscreenState(document.documentElement.getAttribute('data-theme') === 'dark');
    setIsFullscreen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsFullscreen(false);
    document.body.style.overflow = '';
  };

  const container: CSSProperties = {
    margin: '1.5rem 0',
    cursor: 'pointer',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const imgStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'block',
    minHeight: '200px',
  };

  const containerHover: CSSProperties = {
    ...container,
    transform: 'scale(1.02)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
  };

  const overlay: CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  };

  const fullscreenImg: CSSProperties = {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  };

  const closeButton: CSSProperties = {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    width: '48px',
    height: '48px',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background-color 0.2s',
  };

  const fullscreenHint: CSSProperties = {
    position: 'absolute',
    bottom: '1rem',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    fontSize: '0.875rem',
    pointerEvents: 'none',
  };

  return (
    <>
      <div
        style={container}
        onClick={handleImageClick}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        }}
      >
        <img src={src} alt={alt} style={imgStyle} />
        <div style={fullscreenHint}>🔍 点击全屏查看</div>
      </div>

      {isFullscreen && (
        <div style={overlay} onClick={handleClose}>
          <button
            style={closeButton}
            onClick={(e) => {
              e.stopPropagation();
              handleClose();
            }}
          >
            ✕
          </button>
          <img src={src} alt={alt} style={fullscreenImg} />
        </div>
      )}
    </>
  );
}
