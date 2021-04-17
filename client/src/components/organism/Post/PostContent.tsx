import React from 'react';
import Head from 'next/head';
import styled from '@emotion/styled';

// markdown
import ReactMarkdown from 'react-markdown';
import { Components } from 'react-markdown/src/ast-to-react';

// highlight
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/cjs';

// components
import { Content } from 'components/atom';

const components: Components = {
  code({ node, className, ...props }: any) {
    const match = /language-(\w+)/.exec(className || '');
    return match ? (
      <SyntaxHighlighter language={match[1]} PreTag="div" style={dark} {...props} />
    ) : (
      <code className={className} {...props} />
    );
  },
};

export interface PostContentProps {
  content?: string;
}

export const PostContent = ({ content }: PostContentProps): React.ReactElement | null => {
  if (!content) return null;

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
      <PostContentStyle>
        <ReactMarkdown className="markdown-body" components={components}>
          {content}
        </ReactMarkdown>
      </PostContentStyle>
    </>
  );
};

const PostContentStyle = styled(Content)`
  margin-top: 4rem;
  padding-bottom: 4rem;

  .markdown-body {
    ol,
    ul {
      list-style-type: disc;
    }
  }
`;
