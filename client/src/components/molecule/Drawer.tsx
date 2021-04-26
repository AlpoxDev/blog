import React, { useMemo, useCallback } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';

// store
import { useStore } from 'stores';
import { observer } from 'mobx-react-lite';
import { IMainCategory, ISubCategory, ITag } from 'common/models';

// components
import { Text, Content } from 'components/atom';
import { spacing } from 'common';

const BAN_LIST: string[] = ['/', '/me', '/blog/new', '/components'];

export const Drawer = observer((): React.ReactElement | null => {
  const router = useRouter();
  const { pathname } = router;
  const isBan = useMemo(() => BAN_LIST.includes(pathname), [pathname]);

  const { categoryStore, tagStore } = useStore();

  const { mainCategorys } = categoryStore;
  const { tags } = tagStore;

  const onGoHome = useCallback(() => {
    router.push('/blog');
  }, [router]);

  const onClickCategory = useCallback(() => {
    router.push('/blog/category');
  }, [router]);

  const onClickTag = useCallback(() => {
    router.push('/blog/tag');
  }, [router]);

  if (isBan) return null;

  return (
    <DrawerStyle>
      <Content
        location={{
          padding: { top: spacing(8), left: spacing(4), right: spacing(4) },
        }}
      >
        <Text.H3 pointer onClick={onGoHome} fontFamily="inter" fontWeight={300} location={{ bottom: spacing(12) }}>
          Alpox
        </Text.H3>
        <Text.H5
          pointer
          fontFamily="inter"
          fontSize="0.875rem"
          fontWeight={600}
          color="darkGrey"
          onClick={onClickCategory}
        >
          카테고리
        </Text.H5>
        <CategoryList categorys={[...mainCategorys.data]} />
      </Content>

      <Content
        location={{
          padding: { top: spacing(8), left: spacing(4), right: spacing(4) },
        }}
      >
        <Text.H5 pointer fontFamily="inter" fontSize="0.875rem" fontWeight={600} color="darkGrey" onClick={onClickTag}>
          태그
        </Text.H5>
        <TagList tags={[...tags.data]} />
      </Content>
    </DrawerStyle>
  );
});

interface CategoryListProps {
  categorys: IMainCategory[];
}

const CategoryList = ({ categorys }: CategoryListProps): React.ReactElement => {
  const router = useRouter();

  const onClickSubCategory = useCallback(
    (id: string) => {
      router.push(`/blog/category/${id}`);
    },
    [router],
  );

  const categoryList = categorys.map((category: IMainCategory) => {
    return (
      <Content key={category.id} location={{ bottom: spacing(8) }}>
        <Text.Content pointer fontSize="1rem">
          {category.name}
        </Text.Content>
        <Content location={{ top: spacing(4), padding: { left: spacing(4) } }}>
          {category?.subCategorys.map((subCategory: ISubCategory) => (
            <Text.Content
              key={subCategory.id}
              pointer
              fontSize="0.9rem"
              location={{ bottom: spacing(4) }}
              onClick={() => onClickSubCategory(subCategory.id)}
            >
              {subCategory.name}
            </Text.Content>
          ))}
        </Content>
      </Content>
    );
  });

  return <Content location={{ top: spacing(6) }}>{categoryList}</Content>;
};

interface TagListProps {
  tags: ITag[];
}

const TagList = ({ tags }: TagListProps) => {
  const router = useRouter();

  const onClick = useCallback(
    (id: string) => {
      router.push(`/blog/tag/${id}`);
    },
    [router],
  );

  const tagList = tags.map((tag: ITag) => {
    return (
      <Text.Content
        pointer
        key={tag.id}
        fontSize="1rem"
        location={{ bottom: spacing(2), right: spacing(3) }}
        onClick={() => onClick(tag.id)}
      >
        {tag.name}
      </Text.Content>
    );
  });

  return (
    <Content option="flex-row" location={{ top: spacing(6) }}>
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
