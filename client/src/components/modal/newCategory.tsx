import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import produce from 'immer';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Button, Content } from 'components/atom';
import { Modal } from 'components/molecule';

// common
import { spacing } from 'common';
import { IMainCategory, ISubCategory } from 'common/models';

export interface NewCategoryModalProps {
  view: boolean;
  onClose(): void;
}

const parseParams = (input) => {
  const newInput: IMainCategory[] = [];

  input.forEach((mainCategory) => {
    const newMainCategory = { ...mainCategory };
    if (newMainCategory.name) {
      const newSubCategorys: ISubCategory[] = [];
      newMainCategory.subCategorys.forEach((subCategory: ISubCategory) => {
        if (subCategory.name) newSubCategorys.push(subCategory);
      });

      newMainCategory.subCategorys = newSubCategorys as ISubCategory[];
      newInput.push(newMainCategory);
    }
  });

  return newInput;
};

export const NewCategory = observer(({ view, onClose }: NewCategoryModalProps): React.ReactElement | null => {
  const [categorys, setCategorys] = useState<IMainCategory[]>([]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;

      const typeAndValue = name.split(':');
      if (Array.isArray(typeAndValue) && typeAndValue.length >= 2) {
        if (typeAndValue.length === 2) {
          // mainCategory
          setCategorys(
            produce((draft) => {
              draft[typeAndValue[1]].name = value;
            }),
          );
        } else if (typeAndValue.length === 3) {
          // subCategory
          setCategorys(
            produce((draft) => {
              draft[typeAndValue[1]].subCategorys[typeAndValue[2]].name = value;
              // console.log(categorys[typeAndValue[2]]);
            }),
          );
        }
      }
    },
    [categorys],
  );

  const onAddMainCategory = useCallback(() => {
    setCategorys(
      produce((draft) => {
        draft.push({
          name: '',
          subCategorys: [],
        } as IMainCategory);
      }),
    );
  }, []);

  const onAddSubCategory = useCallback((mainCategoryIndex: number) => {
    setCategorys(
      produce((draft) => {
        draft[mainCategoryIndex].subCategorys.push({
          name: '',
        } as ISubCategory);
      }),
    );
  }, []);

  const { categoryStore } = useStore();
  const { mainCategorys, createCategory } = categoryStore;

  const onCreateCategory = useCallback(() => {
    if (createCategory.isPending) return;

    const params = { categorys: parseParams(categorys) };
    categoryStore.onCreateCategory({ params });
  }, [categorys, categoryStore, createCategory.isPending]);

  useEffect(() => {
    if (mainCategorys.isReady) {
      setCategorys(mainCategorys.data.map((mainCategory: IMainCategory) => mainCategory.toJSON()));
    } else {
      const query = { page: 1, limit: 10 };
      categoryStore.onGetCategorys({ query });
    }
  }, [mainCategorys.isReady]);

  useEffect(() => {
    if (!createCategory.isReady) return;

    onClose();

    return () => {
      categoryStore.onGetCategorys({});
      createCategory.onDefault();
    };
  }, [createCategory.isReady]);

  const mainCategoryList = categorys.map((mainCategory: IMainCategory, mainIndex: number) => (
    <Content location={{ bottom: spacing(4) }} key={`main-category-${mainIndex}`}>
      <MainCategoryInput
        name={`main:${mainIndex}`}
        value={mainCategory.name}
        placeholder={`${mainIndex + 1}번재 메인 카테고리를 입력해주세요`}
        onChange={onChange}
      />
      <Content location={{ padding: { left: spacing(4) } }}>
        {mainCategory.subCategorys.map((subCategory: ISubCategory, index: number) => (
          <SubCategoryInput
            key={`sub-category-${index}`}
            name={`sub:${mainIndex}:${index}`}
            value={subCategory.name}
            placeholder={`${index + 1}번재 서브 카테고리를 입력해주세요`}
            onChange={onChange}
          />
        ))}

        <SubCategoryButton onClick={() => onAddSubCategory(mainIndex)} option="point">
          서브 카테고리 추가
        </SubCategoryButton>
      </Content>
    </Content>
  ));

  return (
    <Modal
      view={view}
      onClose={onClose}
      onConfirm={onCreateCategory}
      title="카테고리 생성/수정"
      info="입력을 비워둘시 삭제됩니다."
      buttonOptions={{}}
    >
      {mainCategoryList}
      <MainCategoryButton onClick={onAddMainCategory}>메인 카테고리 추가</MainCategoryButton>
    </Modal>
  );
});

const MainCategoryInput = styled.input`
  width: 100%;
  margin-bottom: 1rem;
  padding: 1rem 1.5rem;

  font-size: 1rem;
  outline: none;
  border: 1px solid #252525;
  border-radius: 4px;
`;

const SubCategoryInput = styled(MainCategoryInput)`
  font-size: 0.875rem;
  padding: 0.6rem 1rem;
`;

const MainCategoryButton = styled(Button)`
  display: block;
  margin: 0 auto;
  margin-top: 3.5rem;
`;

const SubCategoryButton = styled(Button)`
  margin-top: -0.5rem;
  padding: 0.375rem 1rem 0.38rem;
  font-size: 0.875rem;
`;
