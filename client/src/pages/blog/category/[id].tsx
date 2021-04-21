import React, { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { CategoryDetailContainer } from 'containers/category/detail';

const Page = (): React.ReactElement => {
  const router = useRouter();
  const categoryId = router.query?.id;

  const { categoryStore } = useStore();
  const { subCategory } = categoryStore;

  console.log(subCategory.toJSON());

  const onGetCategory = useCallback(() => {
    if (subCategory.isReady || subCategory.isPending) return;

    categoryStore.onGetCategory({ id: categoryId });
  }, [categoryId, subCategory.isReady]);

  useEffect(() => {
    onGetCategory();
  }, [categoryId, onGetCategory]);

  return (
    <>
      <Helmet helmet={helmet({ title: '카테고리 자세히 - AlpoxDev' })} />
      <CategoryDetailContainer />
    </>
  );
};

export default observer(Page);
