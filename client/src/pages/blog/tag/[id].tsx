import React from 'react';

// store
import { observer } from 'mobx-react-lite';
import { initializeStore, useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { TagDetailContainer } from 'containers/tag/detail';

const Page = (): React.ReactElement => {
  const { tagStore } = useStore();
  const { tag } = tagStore;

  return (
    <>
      <Helmet helmet={helmet({ title: `${tag.data?.name} 태그 | AlpoxDev` })} />
      <TagDetailContainer />
    </>
  );
};

export default observer(Page);

Page.getInitialProps = async ({ query }) => {
  const id = query.id;

  const store = initializeStore(true);
  const { tagStore } = store;

  await tagStore.onGetTag({ id });

  return { store };
};
