import React from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Content } from 'components/atom';

// common
import { Location, LocationStyle, spacing } from 'common/style';

// types
import { PostInput } from 'containers/post/new';

export interface PostNewHeaderProps {
  input: PostInput;
  onChange(e: React.ChangeEvent): void;
  onChangeTag(option: 'add' | 'remove', tagName?: string): void;
}

export const PostNewHeader = observer(
  ({ input, onChange, onChangeTag }: PostNewHeaderProps): React.ReactElement => {
    const { uiStore } = useStore();

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
