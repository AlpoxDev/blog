import { types } from 'mobx-state-tree';

import { empty, seriesList, series } from 'common/models';
import {} from 'repository';

export const SeriesStore = types
  .model('SeriesStore', {
    seriesList,
    series,
    createSeries: empty,
    deleteSeries: empty,
    updateSeries: empty,
  })
  .actions((self) => ({}));
