import {useState, useEffect} from 'react';
import type {CSSProperties} from 'react';

interface DocVideoProps {
  src: string;
  alt: string;
}

export default function DocVideo({ src, alt }: DocVideoProps): JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const container: CSSProperties = {
    margin: '1.5rem 0',
    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
    borderRadius: '12px',
    overflow: 'hidden',
    backgroundColor: isDarkMode ? '#1f2937' : '#f9fafb',
  };

  const videoStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'block',
    minHeight: '300px',
    backgroundColor: isDarkMode ? '#1f2937' : '#f9fafb',
  };

  const caption: CSSProperties = {
    padding: '0.75rem 1rem',
    fontSize: '0.875rem',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    textAlign: 'center',
    backgroundColor: isDarkMode ? '#111827' : '#ffffff',
    borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
  };

  return (
    <div style={container}>
      <video
        src={src}
        autoPlay
        muted
        controls
        style={videoStyle}
      >
        您的浏览器不支持视频播放
      </video>
      <div style={caption}>{alt}</div>
    </div>
  );
}
