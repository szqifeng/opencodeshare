import React, { useState, useEffect } from 'react';
import ShareCard from '@site/src/components/ShareCard';
import DocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props: any): JSX.Element {
  const [title, setTitle] = useState('OpenCode 白话教程');
  const [url, setUrl] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const docContent = document.querySelector('article');
    const titleElement = docContent?.querySelector('h1');
    setTitle(titleElement?.textContent || 'OpenCode 白话教程');
    setUrl(window.location.href);
  }, []);

  if (!mounted) {
    return <DocItem {...props} />;
  }

  return (
    <>
      <ShareCard title={title} url={url} />
      <DocItem {...props} />
    </>
  );
}
