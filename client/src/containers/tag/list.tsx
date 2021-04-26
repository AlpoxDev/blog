import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

const Container = (): React.ReactElement => {
  const { tagStore } = useStore();
  const { tags } = tagStore;

  return <p style={{ width: '300px', margin: '10rem auto' }}>{JSON.stringify(tags.toJSON().data)}</p>;
};

export const TagListContainer = observer(Container);
