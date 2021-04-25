import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

// store
import { observer } from 'mobx-react-lite';

// hooks
import { useModal } from 'hooks';

const Page = observer(
  (): React.ReactElement => {
    const router = useRouter();
    const logoutModal = useModal('logout');

    useEffect(() => {
      router.replace('/blog');
      return () => {
        logoutModal.onCreateModal();
      };
    }, []);

    return <></>;
  },
);

export default Page;
