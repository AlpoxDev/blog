import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';

// store
import { observer } from 'mobx-react-lite';
import { useStore } from 'stores';
import { ISeries } from 'common/models';

// components
import { Dropdown } from 'components/molecule/Dropdown';
import { Modal, Input } from 'components/molecule';

export interface SelectSeriesProps {
  view: boolean;
  onClose(): void;
  series: string;
  onChangeSeries(series: ISeries): void;
}

export const SelectSeries = observer(
  ({ view, onClose, series, onChangeSeries }: SelectSeriesProps): React.ReactElement => {
    const [input, setInput] = useState<string>('');

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInput(value);
    }, []);

    const onSelectSeries = useCallback((series: ISeries) => {
      onChangeSeries(series);
      setInput(series.title);
    }, []);

    const { seriesStore } = useStore();
    const { seriesList } = seriesStore;

    useEffect(() => {
      if (seriesList.isReady) return;
      seriesStore.onGetSeriesList({});
    }, [seriesList.isReady]);

    useEffect(() => {
      if (series) setInput(series);
    }, [series]);

    return (
      <Modal
        view={view}
        onClose={onClose}
        onConfirm={onClose}
        buttonOptions={{ disabled: input.length === 0 }}
        title="시리즈 생성/수정"
        info="기존에 있는 시리즈일 경우 자동으로 연결이 됩니다."
      >
        <SeriesDropdown position="left" items={[...seriesList.data]} itemKey="title" onSelectItem={onSelectSeries}>
          <Input label="시리즈 이름" value={input} onChange={onChange} />
        </SeriesDropdown>
      </Modal>
    );
  },
);

const SeriesDropdown = styled(Dropdown)`
  display: block;

  .dropdown-item {
    width: 100%;
  }
`;
