import { Service } from 'typedi';

import {} from '../models';
import { SeriesServiceProps } from './series.interface';

@Service()
export class SeriesService {
  public async onGetSeriesList() {}

  public async onGetSeries() {}

  public async onCreateSeries() {}

  public async onDeleteSeries() {}

  public async onUpdateSeries() {}
}
