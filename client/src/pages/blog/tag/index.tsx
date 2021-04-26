import React from 'react';

// store
import { observer } from 'mobx-react-lite';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { TagListContainer } from 'containers/tag/list';

const Page = (): React.ReactElement => {
  return (
    <>
      <Helmet helmet={helmet({ title: '태그 목록 | AlpoxDev' })} />
      <TagListContainer />
    </>
  );
};

export default observer(Page);
