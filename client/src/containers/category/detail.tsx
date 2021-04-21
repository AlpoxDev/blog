import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

const Container = (): React.ReactElement => {
  const { categoryStore } = useStore();
  const { subCategory } = categoryStore;

  return <p style={{ width: '300px', margin: '10rem auto' }}>{JSON.stringify(subCategory.toJSON().data)}</p>;
};

export const CategoryDetailContainer = observer(Container);
