import React from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

// store
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';
import { IMainCategory, ISubCategory, ITag } from 'common/models';

// components
import { Text, Content } from 'components/atom';
import { spacing } from 'common';

export const Drawer = observer((): React.ReactElement | null => {
  const router = useRouter();

  const { categoryStore, tagStore } = useStore();

  const { mainCategorys } = categoryStore;
  const { tags } = tagStore;

  if (router.pathname === '/' || router.pathname === '/me') return null;

  return (
    <DrawerStyle>
      <Content
        location={{
          padding: { top: spacing(8), left: spacing(4), right: spacing(4) },
        }}
      >
        <Text.H3 fontFamily="inter">Category</Text.H3>
        <CategoryList categorys={[...mainCategorys.data]} />
      </Content>

      <Content
        location={{
          padding: { top: spacing(8), left: spacing(4), right: spacing(4) },
        }}
      >
        <Text.H3 fontFamily="inter">Tag</Text.H3>
        <TagList tags={[...tags.data]} />
      </Content>
    </DrawerStyle>
  );
});

interface CategoryListProps {
  categorys: IMainCategory[];
}

const CategoryList = ({ categorys }: CategoryListProps): React.ReactElement => {
  const categoryList = categorys.map((category: IMainCategory) => {
    return (
      <Text.Content pointer location={{ bottom: spacing(4) }} key={category.id}>
        {category.name}
      </Text.Content>
    );
  });

  return <Content location={{ left: spacing(2), top: spacing(8) }}>{categoryList}</Content>;
};

interface TagListProps {
  tags: ITag[];
}

const TagList = ({ tags }: TagListProps) => {
  const tagList = tags.map((tag: ITag) => {
    return (
      <Text.Content pointer key={tag.id} location={{ bottom: spacing(2), right: spacing(3) }}>
        {tag.name}
      </Text.Content>
    );
  });

  return (
    <Content option="flex-row" location={{ top: spacing(8), padding: { left: spacing(2) } }}>
      {tagList}
    </Content>
  );
};

const DrawerStyle = styled(Content)`
  width: 13.75rem;
  height: 100vh;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;

  background-color: white;
  border-right: 1px solid #252525;

  @media (max-width: 1465px) {
    display: none;
  }
`;
