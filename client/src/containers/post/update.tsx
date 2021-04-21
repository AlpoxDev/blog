import React from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

const Container = (): React.ReactElement => {
  const { postStore } = useStore();
  const { createPost } = postStore;

  return <></>;
};

export const PostUpdateContainer = observer(Container);
