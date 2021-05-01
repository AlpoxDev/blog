import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

// markdown
import marked from 'marked';
import highlight from 'highlight.js';
import 'highlight.js/styles/vs2015.css';

export interface MarkdownPreview {
  content: string;
}

marked.setOptions({
  langPrefix: 'hljs language-',
  highlight: function (code) {
    return highlight.highlightAuto(code, ['jsx', 'code']).value;
  },
});

export const MarkdownPreview = ({ content }: MarkdownPreview): React.ReactElement => {
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
      <PostContentStyle id="post-preview" className="markdown-body" dangerouslySetInnerHTML={{ __html }} />
    </>
  );
};

const PostContentStyle = styled.div`
  padding: 0 1rem;
  padding-bottom: 4rem;

  ol,
  ul {
    list-style-type: disc;
  }

  pre {
    background: #1e1e1e;
  }
`;
