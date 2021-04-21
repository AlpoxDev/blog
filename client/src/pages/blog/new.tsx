import React from 'react';

import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { PostNewContainer } from 'containers/post/new';

const Page = (): React.ReactElement => {
  return (
    <>
      <Helmet helmet={helmet({ title: '글 포스팅 - AlpoxDev' })} />
      <PostNewContainer />
    </>
  );
};

export default observer(Page);
