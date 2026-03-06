import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
function ShareButtons() {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [blogTitle, setBlogTitle] = useState('博客文章');
  
  useEffect(() => {
    const title = document.querySelector('h1')?.textContent || '博客文章';
    setBlogTitle(title);
  }, []);
  
  const handleWechatClick = () => {
    setShowModal(true);
  };
  
  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  const blogUrl = window.location.href;
  
  return (
    <>
      <div className="blog-share-buttons">
        <button className="blog-share-btn wechat" onClick={handleWechatClick}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/>
          </svg>
          微信
        </button>
        <button className="blog-share-btn copy" onClick={handleCopyClick}>
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              已复制
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              复制链接
            </>
          )}
        </button>
      </div>
      
      {showModal && (
        <div className="blog-share-modal" onClick={() => setShowModal(false)}>
          <div className="blog-share-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>扫码分享到微信</h3>
            <div className="blog-share-title">{blogTitle}</div>
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(blogUrl)}`} 
              alt="QR Code"
            />
            <p>打开微信扫一扫</p>
            <div className="blog-share-url">{blogUrl}</div>
          </div>
        </div>
      )}
      
      <style>{`
        .blog-share-buttons {
          display: flex;
          gap: 1rem;
          margin-top: 2.5rem;
          padding: 2rem 0;
          border-top: 1px solid var(--ifm-hr-border-color);
          flex-wrap: wrap;
        }
        
        .blog-share-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.875rem 1.75rem;
          border-radius: 12px;
          border: 2px solid transparent;
          background: var(--ifm-background-color);
          color: var(--ifm-color-content);
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 600;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        }
        
        .blog-share-btn:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        
        .blog-share-btn:active {
          transform: translateY(-1px) scale(1);
        }
        
        .blog-share-btn svg {
          width: 20px;
          height: 20px;
        }
        
        .blog-share-btn.wechat {
          border-color: #e5e7eb;
          background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
          color: #059669;
        }
        
        .blog-share-btn.wechat:hover {
          border-color: #07c160;
          background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
          box-shadow: 0 8px 24px rgba(7, 193, 96, 0.25);
        }
        
        .blog-share-btn.copy {
          border-color: #e5e7eb;
          background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%);
          color: #059669;
        }
        
        .blog-share-btn.copy:hover {
          border-color: #10b981;
          background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
          box-shadow: 0 8px 24px rgba(16, 185, 129, 0.25);
        }
        
        .blog-share-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          cursor: pointer;
          backdrop-filter: blur(4px);
        }
        
        .blog-share-modal-content {
          background: white;
          padding: 2.5rem;
          border-radius: 16px;
          text-align: center;
          max-width: 360px;
          cursor: default;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: modalFadeIn 0.3s ease-out;
        }
        
        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        .blog-share-modal-content h3 {
          margin: 0 0 1.25rem 0;
          color: #111827;
          font-size: 1.25rem;
          font-weight: 700;
        }
        
        .blog-share-title {
          margin-bottom: 1.25rem;
          color: #111827;
          font-size: 1.0625rem;
          font-weight: 600;
          line-height: 1.6;
        }
        
        .blog-share-modal-content img {
          width: 200px;
          height: 200px;
          border-radius: 12px;
          margin-bottom: 1.25rem;
          border: 2px solid #f3f4f6;
        }
        
        .blog-share-modal-content p {
          margin: 0 0 0.75rem 0;
          color: #6b7280;
          font-size: 0.9375rem;
          font-weight: 500;
        }
        
        .blog-share-url {
          margin-top: 0.75rem;
          padding: 0.75rem;
          background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
          border-radius: 10px;
          color: #6b7280;
          font-size: 0.8125rem;
          word-break: break-all;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          border: 1px solid #e5e7eb;
        }
        
        @media (max-width: 768px) {
          .blog-share-buttons {
            gap: 0.75rem;
            padding: 1.5rem 0;
            margin-top: 2rem;
          }
          
          .blog-share-btn {
            padding: 0.75rem 1.5rem;
            font-size: 0.875rem;
            flex: 1;
            justify-content: center;
            min-width: calc(50% - 0.375rem);
          }
          
          .blog-share-btn svg {
            width: 18px;
            height: 18px;
          }
          
          .blog-share-modal-content {
            padding: 2rem;
            max-width: 320px;
            margin: 1rem;
          }
          
          .blog-share-modal-content h3 {
            font-size: 1.125rem;
          }
          
          .blog-share-modal-content img {
            width: 180px;
            height: 180px;
          }
        }
      `}</style>
    </>
  );
}
export default function BlogPostItemFooter() {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {
    tags,
    title,
    editUrl,
    hasTruncateMarker,
    lastUpdatedBy,
    lastUpdatedAt,
  } = metadata;
  const truncatedPost = !isBlogPostPage && hasTruncateMarker;
  const tagsExists = tags.length > 0;
  const renderFooter = tagsExists || truncatedPost || editUrl || isBlogPostPage;
  if (!renderFooter) {
    return null;
  }
  if (isBlogPostPage) {
    const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);
    return (
      <footer className="docusaurus-mt-lg">
        {tagsExists && (
          <div
            className={clsx(
              'row',
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}>
            <div className="col">
              <TagsListInline tags={tags} />
            </div>
          </div>
        )}
        {canDisplayEditMetaRow && (
          <EditMetaRow
            className={clsx(
              'margin-top--sm',
              ThemeClassNames.blog.blogFooterEditMetaRow,
            )}
            editUrl={editUrl}
            lastUpdatedAt={lastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
        <ShareButtons />
      </footer>
    );
  }
  else {
    return (
      <footer className="row docusaurus-mt-lg">
        {tagsExists && (
          <div className={clsx('col', {'col--9': truncatedPost})}>
            <TagsListInline tags={tags} />
          </div>
        )}
        {truncatedPost && (
          <div
            className={clsx('col text--right', {
              'col--3': tagsExists,
            })}>
            <ReadMoreLink blogPostTitle={title} to={metadata.permalink} />
          </div>
        )}
      </footer>
    );
  }
}