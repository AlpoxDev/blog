import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

import config from 'config';

const client_id = config.GITHUB_CLIENT_ID;

const Page = (): React.ReactElement | null => {
  const router = useRouter();
  const { code } = router.query;

  const { authStore } = useStore();
  const { github } = authStore;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!code) {
      window.open(`https://github.com/login/oauth/authorize?client_id=${client_id}&scope=user`);
    } else {
      const params = { code };
      authStore.onGithub({ params });
    }
  }, [code]);

  useEffect(() => {
    if (github.isReady) router.replace('/blog');
  }, [github.isReady]);

  return null;
};

export default observer(Page);
