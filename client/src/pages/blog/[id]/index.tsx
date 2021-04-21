import React from 'react';

import { observer } from 'mobx-react-lite';

// helmet
import { Helmet } from 'components/molecule';
import { customHelmet as helmet } from 'common/helmet';

// container
import { PostDetailContainer } from 'containers/post/detail';

const Page = (): React.ReactElement => {
  return (
    <>
      <Helmet helmet={helmet({ title: '글 자세히 - AlpoxDev' })} />
      <PostDetailContainer />
    </>
  );
};

export default observer(Page);
