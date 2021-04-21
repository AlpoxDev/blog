import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { PostUpdateContainer } from 'containers/post/update';

const Page = (): React.ReactElement => {
  const router = useRouter();
  const postId = router.query?.id;

  const { postStore } = useStore();
  const { post } = postStore;

  const onGetPosts = useCallback(() => {
    if (post.isReady || !postId) return;
    postStore.onGetPost({ id: postId });
  }, [postId, post, postStore]);

  useEffect(() => {
    onGetPosts();
  }, [onGetPosts]);

  return (
    <>
      <Helmet helmet={helmet({ title: 'asdf' })} />
      <PostUpdateContainer />
    </>
  );
};

export default observer(Page);
