import React from 'react';

// store
import { observer } from 'mobx-react-lite';
import { initializeStore, useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { CategoryDetailContainer } from 'containers/category/detail';

const Page = (): React.ReactElement => {
  const { categoryStore } = useStore();
  const { subCategory } = categoryStore;

  return (
    <>
      <Helmet helmet={helmet({ title: `${subCategory.data?.name} 카테고리 | AlpoxDev` })} />
      <CategoryDetailContainer />
    </>
  );
};

export default observer(Page);

Page.getInitialProps = async ({ query }) => {
  const id = query.id;

  const store = initializeStore(true);
  const { categoryStore } = store;

  await categoryStore.onGetCategory({ id });

  return { store };
};
