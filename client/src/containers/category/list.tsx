import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

const Container = (): React.ReactElement => {
  const { categoryStore } = useStore();
  const { mainCategorys } = categoryStore;

  return <p style={{ width: '300px', margin: '10rem auto' }}>{JSON.stringify(mainCategorys.toJSON().data)}</p>;
};

export const CategoryListContainer = observer(Container);
