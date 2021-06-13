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
import { ISeries, ISubCategory } from 'common/models';

export type PostInput = {
  title: string;
  subtitle: string;
  content: string;
  tags: string[];
  category: string;
  series: string;
};

const initPostInput: PostInput = {
  title: '',
  subtitle: '',
  content: '',
  tags: [],
  category: '',
  series: '',
};

const Container = (): React.ReactElement => {
  const router = useRouter();

  const [input, setInput] = useState<PostInput>(initPostInput);
  const [tagInput, setTagInput] = useState<string>('');
  const [initContent, setInitContent] = useState<string>('');
  const [subCategory, setSubCategory] = useState<ISubCategory>(null);
  const [series, setSeries] = useState<ISeries>(null);

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

  const onChangeCategory = useCallback((subCategory: ISubCategory) => {
    setSubCategory(subCategory);
    setInput((state: PostInput) => ({ ...state, category: subCategory.id }));
  }, []);

  const onChangeSeries = useCallback((series: ISeries) => {
    setSeries(series);
    setInput((state: PostInput) => ({ ...state, series: series.title }));
  }, []);

  const { authStore, postStore } = useStore();
  const { createPost } = postStore;
  const { me } = authStore;

  const loginModal = useModal('login');

  const onCreatePost = useCallback(() => {
    if (createPost.isPending) return;

    const params = input;
    if (input.series === '') params.series = null;
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

      <PostNewHeader
        input={input}
        onChange={onChange}
        onChangeTag={onChangeTag}
        subCategory={subCategory}
        series={series}
        onChangeCategory={onChangeCategory}
        onChangeSeries={onChangeSeries}
      />

      <PostNewContent>
        <MarkdownEditor name="content" initValue={initContent} value={input.content} onChange={onChangeContent} />
        <MarkdownPreview content={input.content} />
      </PostNewContent>

      <PostNewFooter onCreate={onCreatePost} onCancel={onCancelPost} />
    </>
  );
};

export const PostNewContainer = observer(Container);
