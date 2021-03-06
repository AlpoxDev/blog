import React from 'react';

// store
import { observer } from 'mobx-react-lite';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { CategoryListContainer } from 'containers/category/list';

const Page = (): React.ReactElement => {
  return (
    <>
      <Helmet helmet={helmet({ title: '카테고리 목록 - AlpoxDev' })} />
      <CategoryListContainer />
    </>
  );
};

export default observer(Page);
