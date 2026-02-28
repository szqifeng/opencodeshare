import type {ReactNode, CSSProperties} from 'react';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Layout from '@theme/Layout';

export default function Home(): ReactNode {
  const isBrowser = useIsBrowser();
  const isDarkMode = isBrowser && document.documentElement.getAttribute('data-theme') === 'dark';

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
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1.5rem',
  };

  const card: CSSProperties = {
    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
    borderRadius: '16px',
    padding: '2rem',
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
    transition: 'all 0.25s ease',
    cursor: 'pointer',
  };

  const cardHover: CSSProperties = {
    transform: 'translateY(-4px)',
    boxShadow: isDarkMode ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)',
  };

  const cardIcon: CSSProperties = {
    fontSize: '2rem',
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
              OpenCode<br/>
              <span style={heroTitleAccent}>人人都能理解的 AI 编程能力</span>
            </h1>
            <p style={heroSubtitle}>
              让编程变得简单有趣。无需深厚的技术背景，通过直观的学习和实践，掌握 AI 编程的核心技能
            </p>
            <div style={heroButtons}>
              <a href="/docs/quick-start/opencode-intro" style={btnPrimary}>免费开始学习</a>
              <a href="#scenarios" style={btnSecondary}>探索应用场景</a>
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
              <circle cx="360" cy="30" r="48" fill="#10b981" opacity="0.12"/>
              <circle cx="420" cy="10" r="32" fill="#10b981" opacity="0.08"/>
              <rect x="390" y="50" width="70" height="45" rx="12" fill="#10b981" opacity="0.06"/>
              <circle cx="80" cy="20" r="20" fill="#10b981" opacity="0.15"/>
              <circle cx="30" cy="60" r="16" fill="#10b981" opacity="0.1"/>
            </svg>
          </div>
        </section>

        <section style={sectionBg} id="features">
          <div style={container}>
             <h2 style={sectionTitle}>为什么选择 OpenCode</h2>
             <div style={cardGrid}>
               <div style={card}>
                 <div style={cardIcon}>🎯</div>
                 <h3 style={cardTitle}>零基础友好</h3>
                 <p style={cardDesc} className="card-desc">无需深厚技术背景，从最基础的概念开始，循序渐进地学习 AI 编程</p>
                 <a href="/docs/quick-start/opencode-intro" style={cardLink}>开始学习 →</a>
               </div>
               <div style={card}>
                 <div style={cardIcon}>💡</div>
                 <h3 style={cardTitle}>生动有趣</h3>
                 <p style={cardDesc} className="card-desc">用生活中的比喻解释复杂概念，让学习过程轻松愉快，不再枯燥</p>
                 <a href="/docs/terminology/llm" style={cardLink}>查看原理 →</a>
               </div>
               <div style={card}>
                 <div style={cardIcon}>⚡</div>
                 <h3 style={cardTitle}>实战导向</h3>
                 <p style={cardDesc} className="card-desc">丰富的真实案例和练习，学完就能应用到实际工作中，立竿见影</p>
                 <a href="/docs/best-practices/code-review" style={cardLink}>查看案例 →</a>
               </div>
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
                 <div style={scenarioIcon}>🎨</div>
                 <h3 style={scenarioTitle}>创意设计</h3>
                 <p style={scenarioDesc} className="scenario-desc">AI 辅助设计</p>
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
              <a href="/docs/quick-start/opencode-intro" style={resourceCard}>
                <div style={resourceIcon}>🚀</div>
                <div style={resourceTitle}>快速入门</div>
              </a>
              <a href="/docs/best-practices/workflow-design" style={resourceCard}>
                <div style={resourceIcon}>✨</div>
                <div style={resourceTitle}>最佳实践</div>
              </a>
              <a href="/docs/troubleshooting/common-issues" style={resourceCard}>
                <div style={resourceIcon}>❓</div>
                <div style={resourceTitle}>常见问题</div>
              </a>
            </div>
          </div>
        </section>
      </main>
      <style dangerouslySetInnerHTML={{
        __html: `
         @media (max-width: 768px) {
           section[id="hero"] {
             padding: 3rem 0.75rem !important;
             flex-direction: column !important;
             gap: 2rem !important;
           }
           section[id="hero"] h1 {
             font-size: 2rem !important;
             line-height: 1.2 !important;
           }
           section[id="hero"] svg {
             width: 100% !important;
             max-width: 320px !important;
             height: auto !important;
           }
           section[id="hero"] p {
             font-size: 1rem !important;
             max-width: 100% !important;
           }
           section[id="hero"] div[style*="display: flex"] {
             flex-direction: column !important;
             width: 100% !important;
           }
           section[id="hero"] a[style*="btnPrimary"],
           section[id="hero"] a[style*="btnSecondary"] {
             width: 100% !important;
             text-align: center !important;
             padding: 0.875rem 1rem !important;
             margin-bottom: 0.75rem !important;
             box-sizing: border-box !important;
           }
           section[id="hero"] a[style*="btnSecondary"] {
             margin-bottom: 0 !important;
           }
           .cardGrid {
             grid-template-columns: 1fr !important;
             gap: 1rem !important;
           }
           .scenarioGrid {
             grid-template-columns: repeat(2, 1fr) !important;
             gap: 0.75rem !important;
           }
           .resourceGrid {
             grid-template-columns: 1fr !important;
             gap: 0.75rem !important;
           }
           .roadmap {
             flex-direction: column !important;
             gap: 1rem !important;
           }
           .roadmapItem {
             text-align: left !important;
             padding: 0.75rem !important;
             background: ${isDarkMode ? '#1f2937' : '#f9fafb'};
             border-radius: 8px;
           }
            .card-desc,
            .scenario-desc,
            .roadmap-desc {
              display: none !important;
            }
            .sectionTitle {
              font-size: 1.5rem !important;
            }
           .roadmapDesc {
             display: none !important;
           }
           .sectionTitle {
             font-size: 1.5rem !important;
           }
           .card {
             padding: 1.25rem !important;
           }
           .scenarioCard {
             padding: 1rem !important;
           }
           .resourceCard {
             padding: 1.25rem !important;
           }
           section {
             padding: 3rem 0.75rem !important;
           }
         }
         @media (max-width: 480px) {
           section[id="hero"] {
             padding: 2rem 0.5rem !important;
           }
           section[id="hero"] h1 {
             font-size: 1.75rem !important;
           }
           section[id="hero"] p {
             font-size: 0.95rem !important;
             line-height: 1.5 !important;
           }
           .scenarioGrid {
             grid-template-columns: 1fr !important;
           }
           .sectionTitle {
             font-size: 1.3rem !important;
           }
           .card,
           .scenarioCard,
           .resourceCard {
             padding: 1rem !important;
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
             grid-template-columns: repeat(2, 1fr) !important;
             gap: 1.25rem !important;
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
           transform: translateY(-4px);
           box-shadow: ${isDarkMode ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)'};
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
        `
      }} />
    </Layout>
  );
}
