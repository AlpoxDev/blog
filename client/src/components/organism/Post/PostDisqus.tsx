import React from 'react';

import { Content } from 'components/atom';
import { DiscussionEmbed } from 'disqus-react';
import { spacing } from 'common';

export interface PostDisqusProps {
  url: string;
  postTitle: string;
  postId: string;
}

export const PostDisqus = ({ url, postTitle, postId }: PostDisqusProps) => {
  return (
    <Content location={{ padding: { top: spacing(6), bottom: spacing(12) } }}>
      <DiscussionEmbed
        shortname="alpox-dev"
        config={{
          url,
          identifier: postId,
          title: postTitle,
        }}
      />
    </Content>
  );
};
