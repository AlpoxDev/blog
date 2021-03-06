import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';

// components
import { Dropdown } from 'components/molecule/Dropdown';
import { Modal, Input } from 'components/molecule';
import { ISeries } from 'common/models';

export interface ConnectSeriesProps {
  view: boolean;
  onClose(): void;
  postId: string;
  series: ISeries | null;
}

export const ConnectSeries = observer(
  ({ view, onClose, postId, series }: ConnectSeriesProps): React.ReactElement => {
    const [input, setInput] = useState<string>('');

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInput(value);
    }, []);

    const onSelectSeries = useCallback((series: ISeries) => {
      setInput(series.title);
    }, []);

    useEffect(() => {
      if (series) setInput(series.title);
    }, [series]);

    const { postStore, seriesStore } = useStore();
    const { seriesList } = seriesStore;
    const { connectSeries } = postStore;

    const onConfirm = useCallback(() => {
      const params = { series: input };
      postStore.onConnectSeries({ id: postId, params });
    }, [postId, input, postStore]);

    useEffect(() => {
      if (!connectSeries.isReady) return;

      onClose();

      return () => {
        connectSeries.onDefault();
        postStore.onGetPost({ id: postId });
      };
    }, [connectSeries.isReady]);

    return (
      <Modal
        view={view}
        onClose={onClose}
        onConfirm={onConfirm}
        title="시리즈 생성/수정"
        info="기존에 있는 시리즈일 경우 자동으로 연결이 됩니다."
      >
        <SeriesDropdown items={seriesList.data} itemKey="title" onSelectItem={onSelectSeries}>
          <Input label="시리즈 이름" value={input} onChange={onChange} />
        </SeriesDropdown>
      </Modal>
    );
  },
);

const SeriesDropdown = styled(Dropdown)`
  display: block;
`;
