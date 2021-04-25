import React, { useCallback } from 'react';

import { Text, Button, Profile } from 'components/atom';
import { Input, Dropdown } from 'components/molecule';
import { spacing } from 'common';

import { useModal } from 'hooks';

const isDEV = process.env.NODE_ENV === 'development';

const dropdownItems = [
  { id: '1', content: 'item1' },
  { id: '2', content: 'item2' },
  { id: '3', content: 'item3' },
];

const Page = (): React.ReactElement | null => {
  if (!isDEV) return null;

  const loginModal = useModal('login');
  const registerModal = useModal('register');
  const logoutModal = useModal('logout');

  const newCategoryModal = useModal('newCategory');
  const newSeriesModal = useModal('newSeries');

  const onSelectItem = useCallback((item: any) => {
    console.log('onSelectItem', item);
  }, []);

  return (
    <>
      <Text.H1 location={{ padding: { top: '2rem' } }}>H1</Text.H1>
      <Text.H2 location={{ top: '.5rem' }}>H2</Text.H2>
      <Text.H3 location={{ top: '.5rem' }}>H3</Text.H3>
      <Text.H4 location={{ top: '.5rem' }}>H4</Text.H4>
      <Text.H5 location={{ top: '.5rem' }}>H5</Text.H5>
      <Text.Content location={{ top: '.5rem' }}>Content</Text.Content>
      <Text.Label location={{ top: '.5rem' }}>Label</Text.Label>

      <Text.Content location={{ top: '1rem', padding: { left: '1rem' } }}>
        This is <Text.Accent>Alpox</Text.Accent>
      </Text.Content>

      <Text.Content location={{ top: '1rem', padding: { left: '1rem' } }} fontFamily="inter">
        This is <Text.Accent>Alpox</Text.Accent>
      </Text.Content>

      <Button location={{ top: '1rem', left: '1rem', right: '1rem' }}>Primary</Button>
      <Button location={{ right: '.5rem' }} option="disabled">
        Disabled
      </Button>
      <Button location={{ right: '.5rem' }} option="flat">
        Flat
      </Button>
      <Button location={{ right: '.5rem' }} option="point">
        Point
      </Button>

      <Profile location={{ top: '1rem' }} />

      <Input value="" onChange={() => {}} label="hi" location={{ top: '1rem', left: '1rem', right: '1rem' }} />

      <Button location={{ right: spacing(6) }} onClick={loginModal.onCreateModal}>
        로그인
      </Button>

      <Button location={{ right: spacing(6) }} onClick={registerModal.onCreateModal}>
        회원가입
      </Button>

      <Button onClick={logoutModal.onCreateModal} location={{ right: spacing(6) }}>
        로그아웃
      </Button>

      <Button location={{ right: spacing(6) }} onClick={newCategoryModal.onCreateModal}>
        카테고리 생성
      </Button>

      <Button location={{}} onClick={newSeriesModal.onCreateModal}>
        시리즈 생성
      </Button>

      <Dropdown items={dropdownItems} itemKey="content" onSelectItem={onSelectItem}>
        <Button>☰</Button>
      </Dropdown>
    </>
  );
};

export default Page;
