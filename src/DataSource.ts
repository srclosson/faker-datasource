import { DataSourceInstanceSettings, PluginMeta } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { FakerQuery, FakerDataSourceOptions } from '../shared/types';

export class DataSource extends DataSourceWithBackend<FakerQuery, FakerDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<FakerDataSourceOptions>) {
    super(instanceSettings);
  }

  importQueries(queries: FakerQuery[], originMeta: PluginMeta): Promise<FakerQuery[]> {
    console.log('import queries', queries, originMeta);
    return Promise.resolve(queries);
  }
}
