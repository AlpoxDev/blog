import React, { useEffect } from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

// markdown
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

export interface PostContentProps {
  content?: string;
}

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return highlight.highlightAuto(code, ['jsx', 'code']).value;
  },
});

export const PostContent = ({ content }: PostContentProps): React.ReactElement | null => {
  if (!content) return null;

  const __html = React.useMemo(() => marked(content), [content]);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css"
          integrity="sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg=="
          crossOrigin="anonymous"
        />
      </Head>
      <PostContentStyle className="markdown-body" dangerouslySetInnerHTML={{ __html }} />
    </>
  );
};

const PostContentStyle = styled.div`
  margin-top: 4rem;
  padding-bottom: 4rem;

  ol,
  ul {
    list-style-type: disc;
  }

  pre {
    background: #1e1e1e;
  }
`;
