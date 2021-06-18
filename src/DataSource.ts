import { DataQueryRequest, DataQueryResponse, DataSourceInstanceSettings, PluginMeta } from '@grafana/data';
import { DataSourceWithBackend } from '@grafana/runtime';
import { FakerQuery, FakerDataSourceOptions } from '../shared/types';
import { Observable } from 'rxjs';

export class DataSource extends DataSourceWithBackend<FakerQuery, FakerDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<FakerDataSourceOptions>) {
    super(instanceSettings);
  }

  query(request: DataQueryRequest<FakerQuery>): Observable<DataQueryResponse> {
    return super.query({
      ...request,
      targets: request.targets.filter((t) => !t.hide),
    });
  }

  importQueries(queries: FakerQuery[], originMeta: PluginMeta): Promise<FakerQuery[]> {
    console.log('import queries', queries, originMeta);
    return Promise.resolve(queries);
  }
}
