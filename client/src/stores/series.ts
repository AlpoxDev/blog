import { types } from 'mobx-state-tree';

import { empty, seriesList, series } from 'common/models';
import { SeriesRepository } from 'repository';

export const SeriesStore = types
  .model('SeriesStore', {
    seriesList,
    series,
    createSeries: empty,
    deleteSeries: empty,
    updateSeries: empty,
  })
  .actions((self) => ({
    onGetSeriesList: (props) =>
      self.seriesList.onGetAll(() => SeriesRepository.onGetSeriesList(props), { dataKey: 'seriesList' }),
    onGetSeries: (props) => self.series.onGetOne(() => SeriesRepository.onGetSeries(props), { dataKey: 'series' }),
  }));
