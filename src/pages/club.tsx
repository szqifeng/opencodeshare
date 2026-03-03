import React, {useState, useEffect} from 'react';
import Layout from '@theme/Layout';

export default function ClubPage(): React.JSX.Element {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDarkMode(document.documentElement.getAttribute('data-theme') === 'dark');
  }, []);

  if (!mounted) return null;

  const container: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '3rem 1.5rem',
  };

  const title: React.CSSProperties = {
    fontSize: '2.5rem',
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: '2rem',
    color: isDarkMode ? '#f9fafb' : '#111827',
  };

  const card: React.CSSProperties = {
    backgroundColor: isDarkMode ? '#1f2937' : '#fff',
    borderRadius: '24px',
    padding: '3rem',
    textAlign: 'center',
    boxShadow: isDarkMode ? '0 20px 40px rgba(0, 0, 0, 0.3)' : '0 20px 40px rgba(0, 0, 0, 0.1)',
    border: `1px solid ${isDarkMode ? '#374151' : '#f3f4f6'}`,
  };

  const qrImage: React.CSSProperties = {
    maxWidth: '320px',
    width: '100%',
    height: 'auto',
    borderRadius: '16px',
    marginBottom: '2rem',
    boxShadow: isDarkMode ? '0 10px 30px rgba(0, 0, 0, 0.4)' : '0 10px 30px rgba(0, 0, 0, 0.15)',
  };

  const description: React.CSSProperties = {
    fontSize: '1.25rem',
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    lineHeight: 1.7,
    marginBottom: '1.5rem',
  };

  const highlight: React.CSSProperties = {
    color: '#10b981',
    fontWeight: 600,
  };

  const infoBox: React.CSSProperties = {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
    borderRadius: '12px',
    textAlign: 'left',
  };

  const infoTitle: React.CSSProperties = {
    fontWeight: 600,
    marginBottom: '0.75rem',
    color: isDarkMode ? '#f9fafb' : '#111827',
    fontSize: '1.1rem',
  };

  const infoText: React.CSSProperties = {
    color: isDarkMode ? '#9ca3af' : '#6b7280',
    lineHeight: 1.6,
    fontSize: '0.95rem',
  };

  return (
    <Layout title="加入社群" description="加入 OpenCode 学习社群，与更多人一起学习 AI 编程">
      <div style={container}>
        <h1 style={title}>加入学习社群</h1>
        <div style={card}>
          <img
            src="https://opencodeshare.oss-cn-shenzhen.aliyuncs.com/club.jpg"
            alt="加入社群二维码"
            style={qrImage}
          />
          <p style={description}>
            扫描上方二维码，加入我们的<span style={highlight}>学习社群</span><br/>
            与志同道合的伙伴一起探索 AI 编程的世界
          </p>
          <div style={infoBox}>
            <div style={infoTitle}>社群福利</div>
            <div style={infoText}>
              • 定期分享 AI 编程最新技巧<br/>
              • 实时解答学习过程中的疑问<br/>
              • 与行业专家直接交流<br/>
              • 参与实战项目合作
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
