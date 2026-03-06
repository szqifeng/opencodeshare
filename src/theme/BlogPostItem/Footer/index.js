import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import TagsListInline from '@theme/TagsListInline';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';
function ShareButtons() {
  const [showQRCode, setShowQRCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fullUrl, setFullUrl] = useState('');
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setFullUrl(window.location.href);
    }
  }, []);
  
  const handleCopyClick = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };
  
  const handleSaveQRCode = () => {
    if (typeof window !== 'undefined') {
      const img = document.querySelector('.blog-share-qr-image');
      if (img && img instanceof HTMLImageElement) {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, 200, 200);
          ctx.drawImage(img, 0, 0, 200, 200);
          const link = document.createElement('a');
          link.download = 'qrcode.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
        }
      }
    }
  };
  
  return (
    <>
      <div className="blog-share-buttons">
        <button 
          className="blog-share-btn" 
          onClick={() => setShowQRCode(!showQRCode)}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 0 1-.023-.156.49.49 0 0 1 .201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.269-.027-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 0 1-.969.983.976.976 0 0 1-.969-.983c0-.542.434-.982.97-.982z"/>
          </svg>
          {showQRCode ? '收起二维码' : '扫描分享'}
        </button>
        <button className="blog-share-btn" onClick={handleCopyClick}>
          {copied ? (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
              已复制
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                <path d="M16 1H4C2.9 1 2 1.9 2 3v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
              </svg>
              复制链接
            </>
          )}
        </button>
      </div>
      
      {showQRCode && (
        <div className="blog-share-qrcode">
          <img 
            className="blog-share-qr-image"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(fullUrl)}`} 
            alt="QR Code"
          />
          <button className="blog-share-save-btn" onClick={handleSaveQRCode}>
            保存二维码
          </button>
        </div>
      )}
      
      <style>{`
        .blog-share-buttons {
          display: flex;
          gap: 0.625rem;
          margin-top: 1.5rem;
          padding: 1.25rem 0;
          border-top: 1px solid var(--ifm-hr-border-color);
          flex-wrap: wrap;
        }
        
        .blog-share-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.625rem 1rem;
          border-radius: 6px;
          border: 1px solid var(--ifm-border-color);
          background: var(--ifm-background-surface-color);
          color: var(--ifm-color-content);
          font-size: 0.8125rem;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .blog-share-btn:hover {
          border-color: #10b981;
          color: #10b981;
          background: rgba(16, 185, 129, 0.05);
        }
        
        .blog-share-btn svg {
          width: 16px;
          height: 16px;
        }
        
        .blog-share-qrcode {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%);
          border: 1px solid #d1fae5;
          border-radius: 8px;
        }
        
        .blog-share-qr-image {
          width: 160px;
          height: 160px;
          border-radius: 6px;
        }
        
        .blog-share-save-btn {
          padding: 0.5rem 1.25rem;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.8125rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .blog-share-save-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        
        @media (max-width: 768px) {
          .blog-share-buttons {
            flex-direction: column;
            padding: 1rem 0;
            margin-top: 1.25rem;
          }
          
          .blog-share-btn {
            width: 100%;
            justify-content: center;
            padding: 0.75rem 1rem;
          }
          
          .blog-share-btn svg {
            width: 18px;
            height: 18px;
          }
          
          .blog-share-qrcode {
            padding: 0.875rem;
            width: 100%;
            box-sizing: border-box;
          }
          
          .blog-share-qr-image {
            width: 140px;
            height: 140px;
          }
          
          .blog-share-save-btn {
            width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .blog-share-buttons {
            gap: 0.5rem;
          }
          
          .blog-share-btn {
            padding: 0.625rem 0.875rem;
            font-size: 0.7875rem;
          }
          
          .blog-share-qrcode {
            padding: 0.75rem;
          }
          
          .blog-share-qr-image {
            width: 120px;
            height: 120px;
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