import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import _, { indexOf } from 'lodash';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Dropdown } from 'components/molecule/Dropdown';
import { Modal, Input } from 'components/molecule';

// common
import { IMainCategory, IPost, ISubCategory, ITag } from 'common/models';
import { spacing } from 'common';

export interface ConnectCategoryProps {
  view: boolean;
  onClose(): void;
  post: IPost;
}

type Input = {
  main: string;
  sub: string;
};

export const ConnectCategory = observer(
  ({ view, onClose, post }: ConnectCategoryProps): React.ReactElement => {
    const [input, setInput] = useState<Input>({ main: '', sub: '' });
    const [mainCategory, setMainCategory] = useState<IMainCategory>(null);
    const [subCategory, setSubCategory] = useState<ISubCategory>(null);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setInput((state: Input) => ({ ...state, [name]: value }));
    }, []);

    const onSelectMainCategory = useCallback((mainCategory: IMainCategory) => {
      setInput((state: Input) => ({ ...state, main: mainCategory.name }));
      setMainCategory(mainCategory);
    }, []);

    const onSelectSubCategory = useCallback((subCategory: ISubCategory) => {
      setInput((state: Input) => ({ ...state, sub: subCategory.name }));
      setSubCategory(subCategory);
    }, []);

    const { categoryStore, postStore } = useStore();
    const { mainCategorys } = categoryStore;
    const { updatePost } = postStore;

    const onConnectCategory = useCallback(() => {
      if (!mainCategory || !subCategory || !post) return;

      const params = {
        title: post.title,
        subtitle: post.subtitle,
        content: post.content,
        thumbnail: post.thumbnail,

        category: subCategory.id,
        tags: post.tags.map((tag: ITag) => tag.name),
      };
      postStore.onUpdatePost({ id: post.id, params });
    }, [mainCategory, subCategory, post]);

    useEffect(() => {
      if (mainCategorys.isReady) return;

      categoryStore.onGetCategorys({});
    }, [mainCategorys.isReady]);

    useEffect(() => {
      if (!updatePost.isReady) return;

      onClose();
      return () => {
        postStore.onGetPost({ id: post.id });
        updatePost.onDefault();
      };
    }, [updatePost.isReady]);

    const mainDropdownItems = useMemo(() => {
      if (input.main === '') return mainCategorys.data;

      return mainCategorys.data.filter((mainCategory: IMainCategory) => {
        const mainCategoryName = mainCategory.name.toLowerCase();
        const inputCategoryName = _.trim(input.main.toLowerCase());
        if (mainCategoryName.includes(inputCategoryName)) return mainCategory;
      });
    }, [input]);

    const subDropdownItems = useMemo(() => {
      if (!mainCategory) return [];
      if (mainCategory && input.sub === '') return mainCategory.subCategorys;

      return mainCategory.subCategorys.filter((subCategory: ISubCategory) => {
        const subCategoryName = subCategory.name.toLowerCase();
        const inputCategoryName = _.trim(input.sub.toLowerCase());
        if (subCategoryName.includes(inputCategoryName)) return subCategory;
      });
    }, [input, mainCategory]);

    return (
      <Modal view={view} onClose={onClose} title="카테고리 연결" onConfirm={onConnectCategory}>
        <CategoryDropdown items={mainDropdownItems} itemKey="name" onSelectItem={onSelectMainCategory}>
          <Input
            label="메인 카테고리"
            name="main"
            value={input.main}
            onChange={onChange}
            location={{ bottom: spacing(4) }}
          />
        </CategoryDropdown>

        <CategoryDropdown items={subDropdownItems} itemKey="name" onSelectItem={onSelectSubCategory}>
          <Input label="서브 카테고리" name="sub" value={input.sub} onChange={onChange} />
        </CategoryDropdown>
      </Modal>
    );
  },
);

const CategoryDropdown = styled(Dropdown)`
  display: block;

  #dropdown-wrapper {
    width: 100%;
    background-color: white;
  }
`;
