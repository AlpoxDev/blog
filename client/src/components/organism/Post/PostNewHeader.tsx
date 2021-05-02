import React, { useEffect } from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Content, Button } from 'components/atom';

// common
import { Location, LocationStyle, spacing } from 'common/style';

// hooks
import { useModal } from 'hooks';

// types
import { PostInput } from 'containers/post/new';
import { ISeries, ISubCategory } from 'common/models';

export interface PostNewHeaderProps {
  input: PostInput;
  onChange(e: React.ChangeEvent): void;
  onChangeTag(option: 'add' | 'remove', tagName?: string): void;
  subCategory: ISubCategory | null;
  series: ISeries | null;
  onChangeCategory(subCategory: ISubCategory): void;
  onChangeSeries(series: ISeries): void;
}

export const PostNewHeader = observer(
  ({
    input,
    onChange,
    onChangeTag,
    subCategory,
    series,
    onChangeCategory,
    onChangeSeries,
  }: PostNewHeaderProps): React.ReactElement => {
    const { uiStore } = useStore();

    const getCategoryModal = useModal('getCategory', { onChangeCategory });
    const selectSeriesModal = useModal('selectSeries', { onChangeSeries, series: series?.title || '' });

    useEffect(() => {
      if (subCategory) getCategoryModal.onDeleteModal();
    }, [subCategory]);

    return (
      <PostNewHeaderStyle>
        <PostNewTitleInput
          name="title"
          placeholder="title"
          value={input.title}
          onChange={onChange}
          location={{ bottom: spacing(4) }}
        />
        <PostNewSubTitleInput
          name="subtitle"
          placeholder="subtitle"
          value={input.subtitle}
          onChange={onChange}
          location={{ bottom: spacing(2.5) }}
        />

        <Button onClick={getCategoryModal.onCreateModal} location={{ right: spacing(4) }}>
          {subCategory ? subCategory.name : '카테고리 선택'}
        </Button>

        <Button onClick={selectSeriesModal.onCreateModal}>{series ? series.title : '시리즈 선택'}</Button>
      </PostNewHeaderStyle>
    );
  },
);

const PostNewHeaderStyle = styled(Content)`
  padding: 1.5rem 2.5rem;
`;

const PostNewTitleInput = styled.input<{ location?: Location }>`
  width: 100%;
  display: block;

  font-size: 2.2rem;

  outline: none;
  border: 0;

  ${(props) => LocationStyle(props.location)}
  font-family: ${(props) => props.theme.fontFamily.spoqa};
  font-weight: 600;
`;

const PostNewSubTitleInput = styled(PostNewTitleInput)`
  font-size: 1.6rem;
`;
