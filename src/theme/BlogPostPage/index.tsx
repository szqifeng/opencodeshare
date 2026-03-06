import React from 'react';
import type {Props} from '@theme/BlogPostPage';
import BlogPostPage from '@theme-original/BlogPostPage';

export default function BlogPostPageWrapper(props: Props): JSX.Element {
  return <BlogPostPage {...props} />;
}
