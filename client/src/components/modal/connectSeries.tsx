import React, { useCallback, useState } from 'react';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Content } from 'components/atom';
import { Modal, Input } from 'components/molecule';

export interface ConnectSeriesProps {
  view: boolean;
  onClose(): void;
  postId?: string;
}

export const ConnectSeries = ({ view, onClose }: ConnectSeriesProps): React.ReactElement => {
  const [input, setInput] = useState<string>('');

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  }, []);

  return (
    <Modal
      view={view}
      onClose={onClose}
      title="시리즈 생성/수정"
      info="기존에 있는 시리즈일 경우 자동으로 연결이 됩니다."
    >
      <Input label="시리즈 이름" value={input} onChange={onChange} />
    </Modal>
  );
};
