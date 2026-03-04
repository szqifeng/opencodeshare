import React from 'react';
import ShareCard from '@site/src/components/ShareCard';
import DocItem from '@theme-original/DocItem';

export default function DocItemWrapper(props: any): JSX.Element {
  const docContent = document.querySelector('article');
  const titleElement = docContent?.querySelector('h1');
  const title = titleElement?.textContent || 'OpenCode 白话教程';
  const url = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      <ShareCard title={title} url={url} />
      <DocItem {...props} />
    </>
  );
}
