import {useState, useEffect} from 'react';
import type {CSSProperties} from 'react';

interface DocImageProps {
  alt: string;
  src?: string;
}

export default function DocImage({ alt, src }: DocImageProps): JSX.Element {
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

  const imgStyle: CSSProperties = {
    width: '100%',
    height: 'auto',
    display: 'block',
    minHeight: '200px',
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

  const placeholderSvg = `
    <svg width="100%" height="300" viewBox="0 0 800 300" xmlns="http://www.w3.org/2000/svg">
      <rect fill="${isDarkMode ? '#1f2937' : '#f9fafb'}" width="800" height="300"/>
      <circle cx="400" cy="150" r="60" fill="${isDarkMode ? '#374151' : '#e5e7eb'}"/>
      <path d="M400 110 L400 190 M360 150 L440 150" stroke="${isDarkMode ? '#9ca3af' : '#6b7280'}" stroke-width="4" stroke-linecap="round"/>
      <text x="400" y="240" text-anchor="middle" fill="${isDarkMode ? '#9ca3af' : '#6b7280'}" font-size="16">${alt}</text>
    </svg>
  `;

  const placeholderUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(placeholderSvg)))}`;

  return (
    <div style={container}>
      <img
        src={src || placeholderUrl}
        alt={alt}
        style={imgStyle}
      />
      <div style={caption}>{alt}</div>
    </div>
  );
}
