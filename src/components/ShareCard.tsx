import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import QRCode from 'qrcode';

interface ShareCardProps {
  title: string;
  url: string;
}

export default function ShareCard({ title, url }: ShareCardProps): JSX.Element {
  const [isGenerating, setIsGenerating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<HTMLImageElement>(null);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  const getPageSummary = (): string => {
    const metaDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
    if (metaDesc) return metaDesc;

    const articleContent = document.querySelector('article');
    const firstP = articleContent?.querySelector('p');
    return firstP?.textContent?.slice(0, 200) || 'OpenCode 白话教程 - 人人都能理解的 AI 编程能力';
  };

  const generateCard = async () => {
    if (!cardRef.current) return;

    setIsGenerating(true);
    try {
      const qrUrl = await QRCode.toDataURL(url, {
        width: 200,
        margin: 0,
        color: {
          dark: '#111827',
          light: '#ffffff',
        },
      });
      setQrDataUrl(qrUrl);

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 3,
        width: 600,
        height: 900,
      });

      const link = document.createElement('a');
      link.download = `${title.slice(0, 20)}-分享卡片.png`;
      link.href = canvas.toDataURL('image/png', 0.95);
      link.click();
    } catch (error) {
      console.error('生成失败:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const isDarkMode = typeof window !== 'undefined' && 
    document.documentElement.getAttribute('data-theme') === 'dark';

  return (
    <>
      <button
        onClick={generateCard}
        disabled={isGenerating}
        style={{
          position: 'fixed',
          bottom: '2.5rem',
          right: '2.5rem',
          zIndex: 1000,
          background: '#10b981',
          color: '#fff',
          width: '56px',
          height: '56px',
          borderRadius: '16px',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 0,
        }}
        onMouseEnter={(e) => {
          Object.assign(e.currentTarget.style, {
            transform: 'translateY(-4px) scale(1.05)',
            boxShadow: '0 12px 32px rgba(16, 185, 129, 0.45)',
          });
        }}
        onMouseLeave={(e) => {
          Object.assign(e.currentTarget.style, {
            transform: '',
            boxShadow: '0 8px 24px rgba(16, 185, 129, 0.35)',
          });
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </button>

      <div
        ref={cardRef}
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          width: '600px',
          height: '900px',
          background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
          borderRadius: '24px',
          padding: '4rem 3rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '3rem',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <svg
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '320px',
            height: '320px',
            pointerEvents: 'none',
          }}
          viewBox="0 0 200 200"
          fill="none"
        >
          <circle cx="160" cy="40" r="48" fill="#10b981" opacity="0.12"/>
          <circle cx="180" cy="120" r="32" fill="#10b981" opacity="0.08"/>
          <circle cx="40" cy="160" r="24" fill="#10b981" opacity="0.1"/>
          <rect x="140" y="80" width="48" height="32" rx="8" fill="#10b981" opacity="0.06"/>
          <circle cx="100" cy="180" r="16" fill="#10b981" opacity="0.15"/>
          <circle cx="20" cy="80" r="20" fill="#10b981" opacity="0.08"/>
        </svg>

        <div style={{ zIndex: 1, textAlign: 'center' }}>
          <div style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            color: '#111827',
            lineHeight: 1.3,
            marginBottom: '1.5rem',
          }}>
            {title}
          </div>
          <div style={{ 
            fontSize: '1.1rem', 
            color: '#6b7280', 
            lineHeight: 1.7,
            maxWidth: '500px',
          }}>
            {getPageSummary()}
          </div>
        </div>

        <div style={{ zIndex: 1 }}>
          <div style={{ 
            background: '#ffffff',
            borderRadius: '32px',
            padding: '3rem',
            boxShadow: '0 12px 48px rgba(0, 0, 0, 0.1)',
            border: '1px solid #f3f4f6',
          }}>
            {qrDataUrl ? (
              <img 
                ref={qrRef}
                src={qrDataUrl} 
                alt="QR Code" 
                style={{ 
                  width: '280px', 
                  height: '280px',
                  display: 'block',
                }}
              />
            ) : (
              <div style={{ 
                width: '280px', 
                height: '280px', 
                background: '#f9fafb', 
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#d1d5db',
              }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            )}
          </div>
        </div>

        <div style={{ zIndex: 1 }}>
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#10b981',
            fontSize: '1rem',
            fontWeight: 600,
          }}>
            <span>✨</span>
            OpenCode 白话教程
          </div>
        </div>
      </div>
    </>
  );
}
