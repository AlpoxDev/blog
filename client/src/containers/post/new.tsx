import React, { useState, useCallback, useEffect } from 'react';
import { Router, useRouter } from 'next/router';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { PostNewContent, MarkdownEditor, MarkdownPreview, PostNewFooter } from 'components/organism/Post';

// hooks
import { useModal } from 'hooks';

type PostInput = {
  title: string;
  subtitle: string;
  content: string;
};

const initPostInput: PostInput = {
  title: '',
  subtitle: '',
  content: '',
};

const Container = (): React.ReactElement => {
  const router = useRouter();

  const [input, setInput] = useState<PostInput>(initPostInput);
  const [initContent, setInitContent] = useState<string>('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput((state: PostInput) => ({ ...state, [name]: value }));
  }, []);

  const onChangeContent = useCallback((content: string) => {
    setInput((state: PostInput) => ({ ...state, content }));
  }, []);

  const { authStore, postStore } = useStore();
  const { createPost } = postStore;
  const { me } = authStore;

  const loginModal = useModal('login');

  const onCreatePost = useCallback(() => {
    if (createPost.isPending) return;

    const params = { ...input };
    postStore.onCreatePost({ params });
  }, [postStore, createPost]);

  const onCancelPost = useCallback(() => {
    setInput(initPostInput);
    setInitContent('');
  }, []);

  useEffect(() => {
    if (me.isReady) return;

    // router.replace('/blog');
    loginModal.onCreateModal();
  }, [me.isReady]);

  return (
    <>
      <PostNewContent>
        <MarkdownEditor name="content" initValue={initContent} value={input.content} onChange={onChangeContent} />
        <MarkdownPreview content={input.content} />
      </PostNewContent>

      <PostNewFooter onCreate={onCreatePost} onCancel={onCancelPost} />
    </>
  );
};

export const PostNewContainer = observer(Container);
