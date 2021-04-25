import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet, customHelmet as helmet } from 'common/helmet';

// components
import {
  PostNewContent,
  MarkdownEditor,
  MarkdownPreview,
  PostNewHeader,
  PostNewFooter,
} from 'components/organism/Post';

// hooks
import { useModal } from 'hooks';

export type PostInput = {
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
};

const initPostInput: PostInput = {
  title: '',
  subtitle: '',
  content: '',
  tags: [],
};

const Container = (): React.ReactElement => {
  const router = useRouter();

  const [input, setInput] = useState<PostInput>(initPostInput);
  const [tagInput, setTagInput] = useState<string>('');
  const [initContent, setInitContent] = useState<string>('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInput((state: PostInput) => ({ ...state, [name]: value }));
  }, []);

  const onChangeContent = useCallback((content: string) => {
    setInput((state: PostInput) => ({ ...state, content }));
  }, []);

  const onChangeTag = useCallback(
    (option: 'add' | 'remove' = 'add', tagName?: string) => {
      if (option === 'add') {
        setInput((state: PostInput) => ({
          ...state,
          tagInput: '',
          tags: [...state.tags, tagInput],
        }));
        setTagInput('');
      } else if (tagName) {
        setInput((state: PostInput) => ({
          ...state,
          tags: state.tags.filter((tag: string) => tag !== tagName),
        }));
      }
    },
    [tagInput],
  );

  const { authStore, postStore } = useStore();
  const { createPost } = postStore;
  const { me } = authStore;

  const loginModal = useModal('login');

  const onCreatePost = useCallback(() => {
    if (createPost.isPending) return;

    const params = { ...input, category: '7d4d15f3-71dd-429c-81e4-b7cc14a9c556' };
    postStore.onCreatePost({ params });
  }, [postStore, createPost, input]);

  const onCancelPost = useCallback(() => {
    setInput(initPostInput);
    setInitContent('');
  }, []);

  useEffect(() => {
    if (!me.isError) return;

    router.replace('/blog');
    loginModal.onCreateModal();
  }, [me.isError]);

  useEffect(() => {
    if (!createPost.isReady) return;

    const postId = createPost.data?.id;
    router.replace(`/blog/${postId}`);
  }, [createPost.isReady]);

  return (
    <>
      <Helmet helmet={customHelmet({ title: input.title ? `${input.title} - AlpoxDev` : '글 작성 - AlpoxDev' })} />

      <PostNewHeader input={input} onChange={onChange} onChangeTag={onChangeTag} />

      <PostNewContent>
        <MarkdownEditor name="content" initValue={initContent} value={input.content} onChange={onChangeContent} />
        <MarkdownPreview content={input.content} />
      </PostNewContent>

      <PostNewFooter onCreate={onCreatePost} onCancel={onCancelPost} />
    </>
  );
};

export const PostNewContainer = observer(Container);
