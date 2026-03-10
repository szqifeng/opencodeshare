import type {ReactNode, CSSProperties} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {useState, useEffect} from 'react';

export default function Home(): ReactNode {
  const isBrowser = useIsBrowser();
  const isDarkMode = isBrowser && document.documentElement.getAttribute('data-theme') === 'dark';
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const {outcome} = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setShowInstallBtn(false);
    }
  };

  const container: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1.5rem',
  };

  const hero: CSSProperties = {
    padding: '8rem 0 5rem',
    display: 'flex',
    alignItems: 'center',
    gap: '4rem',
  };

  const heroContent: CSSProperties = {
    flex: 1,
  };

  const heroTitle: CSSProperties = {
    fontSize: '3.5rem',
    fontWeight: 800,
    lineHeight: 1.1,
    marginBottom: '1.5rem',
    color: isDarkMode ? '#f9fafb' : '#111827',
    letterSpacing: '-0.03em',
  };

  const heroTitleAccent: CSSProperties = {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const heroSubtitle: CSSProperties = {
    fontSize: '1.25rem',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    lineHeight: 1.7,
    marginBottom: '2.5rem',
    maxWidth: '480px',
  };

  const heroButtons: CSSProperties = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap' as const,
  };

  const btnPrimary: CSSProperties = {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#fff',
    padding: '0.875rem 1.75rem',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
    cursor: 'pointer',
  };

  const btnPrimaryHover: CSSProperties = {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
  };

  const btnSecondary: CSSProperties = {
    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
    color: isDarkMode ? '#e5e7eb' : '#374151',
    padding: '0.875rem 1.75rem',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '0.95rem',
    textDecoration: 'none',
    border: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
    transition: 'all 0.2s ease',
    cursor: 'pointer',
  };

  const btnInstall: CSSProperties = {
    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    color: '#fff',
    padding: '0.875rem 1.75rem',
    borderRadius: '10px',
    fontWeight: 600,
    fontSize: '0.95rem',
    border: 'none',
    transition: 'all 0.2s ease',
    boxShadow: '0 4px 14px rgba(139, 92, 246, 0.3)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  };

  const btnInstallHover: CSSProperties = {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(139, 92, 246, 0.4)',
  };

  const btnSecondaryHover: CSSProperties = {
    transform: 'translateY(-2px)',
    backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
  };

  const heroImage: CSSProperties = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  };

  const section: CSSProperties = {
    padding: '5rem 0',
  };

  const sectionBg: CSSProperties = {
    backgroundColor: isDarkMode ? '#111827' : '#f9fafb',
    padding: '5rem 0',
  };

  const sectionTitle: CSSProperties = {
    fontSize: '2rem',
    fontWeight: 700,
    textAlign: 'center' as const,
    marginBottom: '3rem',
    color: isDarkMode ? '#f9fafb' : '#111827',
    letterSpacing: '-0.02em',
  };

  const cardGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1.5rem',
  };

  const cardGridMedia = `
    @media (max-width: 996px) {
      .cardGrid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
    @media (max-width: 576px) {
      .cardGrid {
        grid-template-columns: 1fr !important;
      }
      .card {
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        text-align: center !important;
        padding: 1.5rem !important;
      }
      .card svg {
        width: 48px !important;
        height: 48px !important;
        margin-bottom: 0.75rem !important;
      }
      .card h3 {
        margin-bottom: 0.5rem !important;
      }
      .card-title-full {
        display: none !important;
      }
      .card-title-short {
        display: inline !important;
      }
      .card-link-full {
        display: none !important;
      }
      .card-link-icon {
        display: inline !important;
      }
    }
  `;

  const card: CSSProperties = {
    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
    borderRadius: '16px',
    padding: '2rem',
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative' as const,
    overflow: 'hidden',
  };

  const cardHover: CSSProperties = {
    transform: 'translateY(-4px)',
    boxShadow: isDarkMode ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)',
  };

  const cardIcon: CSSProperties = {
    fontSize: '2rem',
    marginBottom: '1rem',
  };

  const svgIcon: CSSProperties = {
    width: '64px',
    height: '64px',
    marginBottom: '1rem',
  };

  const cardTitle: CSSProperties = {
    fontSize: '1.15rem',
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: isDarkMode ? '#f9fafb' : '#111827',
  };

  const cardDesc: CSSProperties = {
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    lineHeight: 1.6,
    marginBottom: '1rem',
    fontSize: '0.95rem',
  };

  const cardLink: CSSProperties = {
    color: '#10b981',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.9rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.25rem',
  };

  const cardLinkHover: CSSProperties = {
    transform: 'translateX(4px)',
  };

  const cardVideo: CSSProperties = {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    objectFit: 'cover' as const,
    opacity: '0',
    transition: 'opacity 0.3s ease',
    borderRadius: '16px',
  };

  const cardVideoContainer: CSSProperties = {
    position: 'absolute' as const,
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    overflow: 'hidden' as const,
  };

  const cardPlayIcon: CSSProperties = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '3rem',
    opacity: '0',
    transition: 'all 0.3s ease',
    filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))',
  };

  const roadmap: CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  };

  const roadmapItem: CSSProperties = {
    flex: 1,
    textAlign: 'center' as const,
  };

  const roadmapIcon: CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '16px',
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: 700,
    margin: '0 auto 1rem',
    transition: 'all 0.25s ease',
  };

  const roadmapIconHover: CSSProperties = {
    transform: 'scale(1.1)',
  };

  const roadmapTitle: CSSProperties = {
    fontWeight: 600,
    marginBottom: '0.5rem',
    color: isDarkMode ? '#f9fafb' : '#111827',
  };

  const roadmapDesc: CSSProperties = {
    fontSize: '0.9rem',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
  };

  const scenarioGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1rem',
  };

  const scenarioCard: CSSProperties = {
    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
    borderRadius: '16px',
    padding: '1.5rem',
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
    textAlign: 'center' as const,
    transition: 'all 0.25s ease',
    cursor: 'pointer',
  };

  const scenarioCardHover: CSSProperties = {
    transform: 'translateY(-4px)',
    borderColor: '#10b981',
  };

  const scenarioIcon: CSSProperties = {
    fontSize: '1.75rem',
    marginBottom: '0.75rem',
  };

  const scenarioTitle: CSSProperties = {
    fontWeight: 600,
    fontSize: '0.95rem',
    color: isDarkMode ? '#f9fafb' : '#111827',
    marginBottom: '0.25rem',
  };

  const scenarioDesc: CSSProperties = {
    fontSize: '0.8rem',
    color: isDarkMode ? '#9ca3af' : '#9ca3af',
  };

  const resourceGrid: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  };

  const resourceCard: CSSProperties = {
    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
    borderRadius: '16px',
    padding: '2rem',
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
    textAlign: 'center' as const,
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.25s ease',
    display: 'block',
    cursor: 'pointer',
  };

  const resourceCardHover: CSSProperties = {
    transform: 'translateY(-4px)',
    borderColor: '#10b981',
  };

  const resourceIcon: CSSProperties = {
    fontSize: '2rem',
    marginBottom: '1rem',
  };

  const resourceTitle: CSSProperties = {
    fontWeight: 600,
    fontSize: '1rem',
    color: isDarkMode ? '#f9fafb' : '#111827',
  };

  return (
    <Layout>
      <main>
        <section style={{...container, ...hero}} id="hero">
          <div style={heroContent}>
            <h1 style={heroTitle}>
              OpenCode 白话教程<br/>
              <span style={heroTitleAccent}>人人都能理解的 AI 编程能力</span>
            </h1>
            <p style={heroSubtitle}>
              让编程变得简单有趣。无需深厚的技术背景，通过直观的学习和实践，掌握 AI 编程的核心技能
            </p>
            <div style={heroButtons}>
              <Link to="/docs/quick-start/starter-guide" style={btnPrimary}>免费开始学习</Link>
              <Link to="#scenarios" style={btnSecondary}>探索应用场景</Link>
              {showInstallBtn && (
                <button
                  onClick={handleInstallClick}
                  style={btnInstall}
                  onMouseEnter={(e) => Object.assign(e.currentTarget.style, btnInstallHover)}
                  onMouseLeave={(e) => Object.assign(e.currentTarget.style, {transform: '', boxShadow: ''})}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.25 6H3.75A2.25 2.25 0 001.5 8.25v8.25a2.25 2.25 0 002.25 2.25h5.25l3 3.75 3-3.75h5.25a2.25 2.25 0 002.25-2.25V8.25A2.25 2.25 0 0020.25 6z" />
                    <path d="M12 12h.01" />
                    <path d="M9 12h.01" />
                    <path d="M15 12h.01" />
                  </svg>
                  添加到桌面
                </button>
              )}
            </div>
          </div>
          <div style={heroImage}>
            <svg width="480" height="360" viewBox="0 0 480 360" fill="none">
              <rect x="40" y="60" width="400" height="240" rx="20" fill={isDarkMode ? '#1f2937' : '#fff'} stroke={isDarkMode ? '#374151' : '#e5e7eb'} strokeWidth="2"/>
              <rect x="60" y="80" width="120" height="16" rx="4" fill="#10b981"/>
              <rect x="60" y="110" width="280" height="12" rx="4" fill={isDarkMode ? '#374151' : '#f3f4f6'}/>
              <rect x="60" y="135" width="220" height="12" rx="4" fill={isDarkMode ? '#374151' : '#f3f4f6'}/>
              <rect x="60" y="180" width="360" height="90" rx="12" fill={isDarkMode ? '#374151' : '#f9fafb'} stroke={isDarkMode ? '#374151' : '#e5e7eb'} strokeWidth="1"/>
              <circle cx="240" cy="225" r="32" fill="#10b981"/>
              <path d="M232 225l6 6 10-10" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="360" cy="30" r="48" fill="#10b981" opacity="0.12">
                <animate attributeName="cy" values="30;5;30" dur="3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="420" cy="10" r="32" fill="#10b981" opacity="0.08">
                <animate attributeName="cy" values="10;-15;10" dur="4s" repeatCount="indefinite"/>
              </circle>
              <rect x="390" y="50" width="70" height="45" rx="12" fill="#10b981" opacity="0.06">
                <animate attributeName="y" values="50;30;50" dur="3.5s" repeatCount="indefinite"/>
              </rect>
              <circle cx="80" cy="20" r="20" fill="#10b981" opacity="0.15">
                <animate attributeName="cy" values="20;-5;20" dur="2.5s" repeatCount="indefinite"/>
              </circle>
              <circle cx="30" cy="60" r="16" fill="#10b981" opacity="0.1">
                <animate attributeName="cy" values="60;40;60" dur="3.2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="100" cy="280" r="8" fill="#10b981" opacity="0.2">
                <animate attributeName="cy" values="280;255;280" dur="2.8s" repeatCount="indefinite"/>
              </circle>
              <circle cx="150" cy="295" r="12" fill="#10b981" opacity="0.15">
                <animate attributeName="cy" values="295;270;295" dur="3.3s" repeatCount="indefinite"/>
              </circle>
              <circle cx="200" cy="285" r="6" fill="#10b981" opacity="0.25">
                <animate attributeName="cy" values="285;260;285" dur="2.6s" repeatCount="indefinite"/>
              </circle>
              <circle cx="300" cy="290" r="10" fill="#10b981" opacity="0.18">
                <animate attributeName="cy" values="290;265;290" dur="3.1s" repeatCount="indefinite"/>
              </circle>
              <circle cx="380" cy="282" r="7" fill="#10b981" opacity="0.22">
                <animate attributeName="cy" values="282;257;282" dur="2.9s" repeatCount="indefinite"/>
              </circle>
              <text x="310" y="85" fill="#10b981" fontSize="18" fontWeight="800" textAnchor="end">拒绝空谈</text>
              <text x="310" y="108" fill={isDarkMode ? '#f9fafb' : '#111827'} fontSize="15" fontWeight="700" textAnchor="end">回归本质</text>
              <text x="310" y="130" fill={isDarkMode ? '#d1d5db' : '#4b5563'} fontSize="13" textAnchor="end">亲身实践AI工具</text>
              <text x="310" y="148" fill={isDarkMode ? '#d1d5db' : '#4b5563'} fontSize="13" textAnchor="end">传递真实经验</text>
              <text x="310" y="168" fill="#10b981" fontSize="14" fontWeight="700" textAnchor="end">简洁 · 美好 · 实用</text>
            </svg>
          </div>
        </section>

        <section style={sectionBg} id="features">
           <div style={container}>
               <h2 style={sectionTitle}>核心能力</h2>
<div style={cardGrid}>
                  <Link to="/docs/09-openclaw/mac-docker-install" className="card" style={card}>
                   <svg style={svgIcon} viewBox="0 0 64 64" fill="none">
                     <defs>
                       <linearGradient id="openclawGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                         <stop offset="0%" style={{stopColor: '#ef4444', stopOpacity: 1}} />
                         <stop offset="100%" style={{stopColor: '#dc2626', stopOpacity: 1}} />
                       </linearGradient>
                     </defs>
                     <circle cx="32" cy="32" r="28" fill="url(#openclawGradient)" opacity="0.1">
                       <animate attributeName="r" values="28;32;28" dur="3s" repeatCount="indefinite"/>
                     </circle>
                     <path d="M32 12L44 24V40L32 52L20 40V24L32 12Z" stroke="url(#openclawGradient)" strokeWidth="2" fill="none">
                       <animate attributeName="stroke-dasharray" values="0,200;200,0;200,0" dur="2s" repeatCount="indefinite"/>
                     </path>
                     <circle cx="32" cy="32" r="8" fill="url(#openclawGradient)">
                       <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
                       <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
                     </circle>
                     <circle cx="32" cy="32" r="4" fill="#fff"/>
                   </svg>
                   <h3 style={cardTitle}>OpenClaw</h3>
                    <p style={cardDesc} className="card-desc">强大的 AI 自动化工具，通过飞书等渠道实现智能交互和任务自动化</p>
                    <Link to="/docs/09-openclaw/mac-docker-install" style={cardLink}><span className="card-link-full">快速安装</span><span className="card-link-icon">→</span></Link>
                  </Link>
                  <Link to="/docs/quick-start/starter-guide" className="card" style={card}>
                  <svg style={svgIcon} viewBox="0 0 64 64" fill="none">
                    <defs>
                      <linearGradient id="starterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#ec4899', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#db2777', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <g>
                      <circle cx="32" cy="32" r="28" fill="url(#starterGradient)" opacity="0.15">
                        <animate attributeName="r" values="28;32;28" dur="2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.15;0.25;0.15" dur="2s" repeatCount="indefinite"/>
                      </circle>
                      <path d="M32 16L40 32H34L38 48L28 48L24 32H18L32 16Z" fill="url(#starterGradient)">
                        <animate attributeName="d" values="M32 16L40 32H34L38 48L28 48L24 32H18L32 16Z;M32 14L40 30H34L38 50L28 50L24 30H18L32 14Z;M32 16L40 32H34L38 48L28 48L24 32H18L32 16Z" dur="1.5s" repeatCount="indefinite"/>
                      </path>
                      <circle cx="32" cy="20" r="5" fill="url(#starterGradient)" opacity="0.8">
                        <animate attributeName="r" values="5;8;5" dur="1.2s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.8;0.4;0.8" dur="1.2s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="36" cy="44" r="3" fill="url(#starterGradient)" opacity="0.6">
                        <animate attributeName="r" values="3;5;3" dur="0.8s" repeatCount="indefinite"/>
                        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="0.8s" repeatCount="indefinite"/>
                      </circle>
                      <circle cx="28" cy="44" r="3" fill="url(#starterGradient)" opacity="0.6">
                        <animate attributeName="r" values="3;5;3" dur="0.8s" repeatCount="indefinite" begin="0.4s"/>
                        <animate attributeName="opacity" values="0.6;0.3;0.6" dur="0.8s" repeatCount="indefinite" begin="0.4s"/>
                      </circle>
                      <circle cx="40" cy="36" r="2" fill="url(#starterGradient)" opacity="0.4">
                        <animate attributeName="r" values="2;4;2" dur="0.6s" repeatCount="indefinite" begin="0.2s"/>
                        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="0.6s" repeatCount="indefinite" begin="0.2s"/>
                      </circle>
                      <circle cx="24" cy="36" r="2" fill="url(#starterGradient)" opacity="0.4">
                        <animate attributeName="r" values="2;4;2" dur="0.6s" repeatCount="indefinite" begin="0.5s"/>
                        <animate attributeName="opacity" values="0.4;0.2;0.4" dur="0.6s" repeatCount="indefinite" begin="0.5s"/>
                      </circle>
                    </g>
                    <animateTransform attributeName="transform" type="translate" values="0,0;0,-1.5;0,0" dur="1.2s" repeatCount="indefinite"/>
                  </svg>
   <h3 style={cardTitle}>
   <span className="card-title-short">OpenCode</span></h3>
                    <p style={cardDesc} className="card-desc">本地部署、云上部署都支持讲解，5分钟上手，30分钟掌握核心概念</p>
                   <Link to="/docs/quick-start/starter-guide" style={cardLink}><span className="card-link-full">立即开始</span><span className="card-link-icon">→</span></Link>
                  </Link>
                 <Link to="/docs/quick-start/skills-intro" className="card" style={card}>
                  <svg style={svgIcon} viewBox="0 0 64 64" fill="none">
                    <defs>
                      <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#10b981', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#059669', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <circle cx="32" cy="32" r="28" fill="url(#skillGradient)" opacity="0.1">
                      <animate attributeName="r" values="28;32;28" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <path d="M32 8L56 24V40L32 56L8 40V24L32 8Z" stroke="url(#skillGradient)" strokeWidth="2" fill="none">
                      <animate attributeName="stroke-dasharray" values="0,200;200,0;200,0" dur="1.5s" repeatCount="indefinite"/>
                    </path>
                    <circle cx="32" cy="32" r="8" fill="url(#skillGradient)">
                      <animate attributeName="r" values="8;10;8" dur="2s" repeatCount="indefinite"/>
                      <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="32" cy="32" r="4" fill="#fff"/>
                  </svg>
                  <h3 style={cardTitle}>Skills</h3>
                   <p style={cardDesc} className="card-desc">技能集合，一键添加成熟技能，例如：发送邮件</p>
                   <Link to="/docs/quick-start/skills-intro" style={cardLink}><span className="card-link-full">了解技能</span><span className="card-link-icon">→</span></Link>
                 </Link>
                 <Link to="/docs/quick-start/tools-intro" className="card" style={card}>
                   <svg style={svgIcon} viewBox="0 0 64 64" fill="none">
                    <defs>
                      <linearGradient id="toolGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#8b5cf6', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#7c3aed', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <circle cx="32" cy="32" r="28" fill="url(#toolGradient)" opacity="0.1">
                      <animate attributeName="r" values="28;32;28" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <rect x="16" y="24" width="32" height="16" rx="4" stroke="url(#toolGradient)" strokeWidth="2" fill="none">
                      <animate attributeName="x" values="16;14;16" dur="2s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="20" y="28" width="24" height="8" rx="2" fill="url(#toolGradient)">
                      <animate attributeName="opacity" values="1;0.4;1" dur="1.5s" repeatCount="indefinite"/>
                    </rect>
                    <circle cx="48" cy="32" r="6" stroke="url(#toolGradient)" strokeWidth="2" fill="none">
                      <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="16" cy="32" r="6" stroke="url(#toolGradient)" strokeWidth="2" fill="none">
                      <animate attributeName="r" values="6;8;6" dur="1s" repeatCount="indefinite" begin="0.5s"/>
                    </circle>
                  </svg>
                  <h3 style={cardTitle}>Tools</h3>
                   <p style={cardDesc} className="card-desc">内置工具集合，快速获取自定义工具，例如：Excel 操作、邮件发送、数据库管理</p>
                   <Link to="/docs/quick-start/tools-intro" style={cardLink}><span className="card-link-full">了解工具</span><span className="card-link-icon">→</span></Link>
                 </Link>
                 <Link to="/docs/quick-start/agents-intro" className="card" style={card}>
                   <svg style={svgIcon} viewBox="0 0 64 64" fill="none">
                    <defs>
                      <linearGradient id="agentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor: '#f59e0b', stopOpacity: 1}} />
                        <stop offset="100%" style={{stopColor: '#d97706', stopOpacity: 1}} />
                      </linearGradient>
                    </defs>
                    <circle cx="32" cy="32" r="28" fill="url(#agentGradient)" opacity="0.1">
                      <animate attributeName="r" values="28;32;28" dur="3.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="32" cy="20" r="8" stroke="url(#agentGradient)" strokeWidth="2" fill="none">
                      <animate attributeName="cy" values="20;18;20" dur="2s" repeatCount="indefinite"/>
                    </circle>
                    <path d="M18 40Q32 32 46 40" stroke="url(#agentGradient)" strokeWidth="2" fill="none">
                      <animate attributeName="d" values="M18 40Q32 32 46 40;M18 38Q32 34 46 38;M18 40Q32 32 46 40" dur="1.5s" repeatCount="indefinite"/>
                    </path>
                    <circle cx="20" cy="24" r="2" fill="url(#agentGradient)">
                      <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="44" cy="24" r="2" fill="url(#agentGradient)">
                      <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" begin="0.25s"/>
                    </circle>
                    <rect x="26" y="44" width="12" height="2" rx="1" fill="url(#agentGradient)">
                      <animate attributeName="width" values="12;14;12" dur="1s" repeatCount="indefinite"/>
                    </rect>
                  </svg>
                  <h3 style={cardTitle}>Agent</h3>
                   <p style={cardDesc} className="card-desc">代理规则集合，自主处理复杂任务，例如：任务编排</p>
                   <Link to="/docs/02-daily-usage/agents" style={cardLink}><span className="card-link-full">了解代理</span><span className="card-link-icon">→</span></Link>
                 </Link>
              </div>
            </div>
         </section>

        <section style={section} id="roadmap">
          <div style={container}>
            <h2 style={sectionTitle}>学习之旅从这里开始</h2>
            <div style={roadmap}>
               <div style={roadmapItem}>
                 <div style={roadmapIcon}>📚</div>
                 <h3 style={roadmapTitle}>概念入门</h3>
                 <p style={roadmapDesc} className="roadmap-desc">了解基本概念和术语</p>
               </div>
               <div style={roadmapItem}>
                 <div style={roadmapIcon}>🔬</div>
                 <h3 style={roadmapTitle}>原理探究</h3>
                 <p style={roadmapDesc} className="roadmap-desc">深入理解核心机制</p>
               </div>
               <div style={roadmapItem}>
                 <div style={roadmapIcon}>🎮</div>
                 <h3 style={roadmapTitle}>实践练习</h3>
                 <p style={roadmapDesc} className="roadmap-desc">动手完成实战项目</p>
               </div>
               <div style={roadmapItem}>
                 <div style={roadmapIcon}>🚀</div>
                 <h3 style={roadmapTitle}>熟练应用</h3>
                 <p style={roadmapDesc} className="roadmap-desc">自主解决实际问题</p>
               </div>
            </div>
          </div>
        </section>

        <section style={sectionBg} id="scenarios">
          <div style={container}>
            <h2 style={sectionTitle}>探索无限可能</h2>
            <div style={scenarioGrid}>
               <div style={scenarioCard}>
                 <div style={scenarioIcon}>💻</div>
                 <h3 style={scenarioTitle}>智能编程</h3>
                 <p style={scenarioDesc} className="scenario-desc">代码生成与优化</p>
               </div>
               <div style={scenarioCard}>
                 <div style={scenarioIcon}>📝</div>
                 <h3 style={scenarioTitle}>文档创作</h3>
                 <p style={scenarioDesc} className="scenario-desc">自动生成文档</p>
               </div>
                <div style={scenarioCard}>
                  <div style={scenarioIcon}>🤖</div>
                  <h3 style={scenarioTitle}>个人助手</h3>
                  <p style={scenarioDesc} className="scenario-desc">智能助手服务</p>
                </div>
               <div style={scenarioCard}>
                 <div style={scenarioIcon}>🔧</div>
                 <h3 style={scenarioTitle}>自动化</h3>
                 <p style={scenarioDesc} className="scenario-desc">流程优化提效</p>
               </div>
            </div>
          </div>
        </section>

        <section style={section} id="resources">
          <div style={container}>
            <h2 style={sectionTitle}>开始你的学习之旅</h2>
            <div style={resourceGrid}>
              <Link to="/docs/quick-start/starter-guide" style={resourceCard}>
                <div style={resourceIcon}>🚀</div>
                <div style={resourceTitle}>快速入门</div>
              </Link>
              <Link to="/docs/best-practices/workflow-design" style={resourceCard}>
                <div style={resourceIcon}>✨</div>
                <div style={resourceTitle}>最佳实践</div>
              </Link>
              <Link to="/docs/troubleshooting/common-issues" style={resourceCard}>
                <div style={resourceIcon}>❓</div>
                <div style={resourceTitle}>常见问题</div>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <style dangerouslySetInnerHTML={{
        __html: `
          ${cardGridMedia}
          @media (max-width: 768px) {
           body {
             overflow-x: auto !important;
             overflow-y: auto !important;
             width: 100% !important;
           }
           main {
             overflow-x: auto !important;
             overflow-y: auto !important;
             width: 100vw !important;
           }
           section {
            min-width: auto !important;
            max-width: 100% !important;
          }
          .container {
            min-width: 100% !important;
            max-width: 100% !important;
            padding: 0 1.5rem !important;
          }
          section[id="features"] .container,
           section[id="scenarios"] .container,
           section[id="resources"] .container,
           section[id="starter"] .container {
            padding: 0 1rem !important;
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
          }
           section[id="features"] .cardGrid,
            section[id="scenarios"] .scenarioGrid,
            section[id="resources"] .resourceGrid {
              display: grid !important;
              grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
              gap: 0.75rem !important;
              justify-content: center !important;
              width: 100% !important;
            }
           section[id="features"] h2,
           section[id="scenarios"] h2,
           section[id="resources"] h2,
           section[id="starter"] h2 {
            font-size: 1.5rem !important;
            text-align: center !important;
            margin-bottom: 1rem !important;
          }
           section[id="features"] .card,
           section[id="scenarios"] .scenarioCard,
           section[id="resources"] .resourceCard,
           section[id="starter"] .starterCard {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            padding: 1.5rem !important;
          }
          main {
            overflow-x: auto !important;
            overflow-y: hidden !important;
            width: 100vw !important;
          }
          section {
            min-width: 100vw !important;
          }
          section[id="hero"] {
            padding: 2rem 0.75rem !important;
            flex-direction: column !important;
            gap: 1.5rem !important;
            min-height: auto !important;
          }
          section[id="hero"] h1 {
            font-size: 2rem !important;
            line-height: 1.2 !important;
          }
          section[id="hero"] svg {
            width: 100% !important;
            max-width: 320px !important;
            height: auto !important;
            margin: 0 auto !important;
          }
          section[id="hero"] p {
            font-size: 1rem !important;
            max-width: 100% !important;
            line-height: 1.5 !important;
            margin-bottom: 1rem !important;
          }
          section[id="hero"] div[style*="display: flex"] {
            width: 100% !important;
            margin: 0 !important;
            display: flex !important;
            justify-content: center !important;
            flex-wrap: nowrap !important;
            gap: 0.5rem !important;
          }
          section[id="hero"] a[style*="btnPrimary"],
          section[id="hero"] a[style*="btnSecondary"] {
            width: auto !important;
            padding: 0.75rem 1.5rem !important;
            margin: 0 !important;
            font-size: 0.85rem !important;
            white-space: nowrap !important;
          }
           .cardGrid {
             grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)) !important;
             gap: 1rem !important;
             width: max-content !important;
           }
          .scenarioGrid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important;
            gap: 0.75rem !important;
            width: max-content !important;
          }
           .resourceGrid {
             grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)) !important;
             gap: 0.75rem !important;
             width: max-content !important;
           }
          .section {
            padding: 2rem 0.75rem !important;
            min-width: 100vw !important;
          }
           .container {
             min-width: 100% !important;
           }
           section[id="starter"] .starterFeatures {
             flex-direction: column !important;
             gap: 0.75rem !important;
             align-items: flex-start !important;
           }
           section[id="starter"] .starterBtn {
             width: 100% !important;
             justify-content: center !important;
           }
          }
          @media (max-width: 480px) {
           section[id="hero"] {
             padding: 1.5rem 0.5rem !important;
           }
           section[id="hero"] h1 {
             font-size: 1.75rem !important;
           }
           section[id="hero"] p {
             font-size: 0.95rem !important;
             line-height: 1.5 !important;
           }
           .cardGrid {
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)) !important;
            gap: 0.75rem !important;
          }
           .scenarioGrid {
            grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)) !important;
            gap: 0.75rem !important;
          }
           .resourceGrid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)) !important;
            gap: 0.75rem !important;
          }
           .sectionTitle {
             font-size: 1.3rem !important;
           }
            .card,
            .scenarioCard,
            .resourceCard,
            section[id="starter"] .starterCard {
              padding: 1rem !important;
            }
            section[id="starter"] .starterTitle {
              font-size: 1.5rem !important;
            }
            section[id="starter"] .starterDesc {
              font-size: 1rem !important;
            }
            section[id="starter"] .starterFeatures {
              gap: 0.5rem !important;
            }
           .roadmapIcon {
             width: 48px !important;
             height: 48px !important;
             font-size: 1.1rem !important;
           }
         }
         @media (min-width: 769px) and (max-width: 996px) {
           section[id="hero"] {
             padding: 6rem 2rem !important;
             gap: 3rem !important;
           }
             .cardGrid {
               grid-template-columns: repeat(4, 1fr) !important;
               gap: 1rem !important;
             }
            section[id="starter"] .starterCard {
              padding: 2rem !important;
            }
            section[id="starter"] .starterFeatures {
              flex-wrap: wrap !important;
              gap: 1rem !important;
              justify-content: center !important;
            }
            .scenarioGrid {
             grid-template-columns: repeat(2, 1fr) !important;
             gap: 1rem !important;
           }
            .resourceGrid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 1.25rem !important;
            }
         }
         .btn-primary:hover {
           transform: translateY(-2px);
           box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
         }
         .btn-secondary:hover {
           transform: translateY(-2px);
           background-color: ${isDarkMode ? '#374151' : '#f9fafb'};
         }
          .card:hover {
            transform: translateY(-8px);
            box-shadow: ${isDarkMode ? '0 30px 60px rgba(16, 185, 129, 0.2)' : '0 30px 60px rgba(16, 185, 129, 0.15)'};
            border-color: #10b981;
          }
         .cardLink:hover {
           transform: translateX(4px);
         }
         .scenarioCard:hover {
           transform: translateY(-4px);
           border-color: #10b981;
         }
         .resourceCard:hover {
           transform: translateY(-4px);
           border-color: #10b981;
         }
          .roadmapIcon:hover {
            transform: scale(1.1);
          }
          @keyframes cardGlow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(16, 185, 129, 0);
            }
            50% {
              box-shadow: 0 0 30px rgba(16, 185, 129, 0.1);
            }
          }
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .card {
            animation: slideUp 0.6s ease-out forwards, cardGlow 3s ease-in-out infinite;
          }
          .card:nth-child(1) {
            animation-delay: 0s;
          }
          .card:nth-child(2) {
            animation-delay: 0.1s;
          }
          .card:nth-child(3) {
            animation-delay: 0.2s;
          }
          .card:nth-child(4) {
            animation-delay: 0.3s;
          }
          @keyframes starterFloat {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          .starterCard {
            animation: slideUp 0.8s ease-out forwards, cardGlow 4s ease-in-out infinite;
          }
         `
       }} />
    </Layout>
  );
}
