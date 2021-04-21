import React, { useCallback, useEffect } from 'react';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { CategoryListContainer } from 'containers/category/list';

const Page = (): React.ReactElement => {
  const { categoryStore } = useStore();
  const { mainCategorys } = categoryStore;

  const onGetCategorys = useCallback(() => {
    if (mainCategorys.isReady) return;
    categoryStore.onGetCategorys({});
  }, [mainCategorys]);

  useEffect(() => {
    onGetCategorys();
  }, [onGetCategorys]);

  return (
    <>
      <Helmet helmet={helmet({ title: '카테고리 목록 - AlpoxDev' })} />
      <CategoryListContainer />
    </>
  );
};

export default observer(Page);
