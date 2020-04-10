import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  PluginMeta,
  DataFrame,
  FieldType,
  ArrayVector,
  dateTime,
} from '@grafana/data';
import { FakerQuery, FakerDataSourceOptions } from './types';
import * as faker from 'faker';

export class DataSource extends DataSourceApi<FakerQuery, FakerDataSourceOptions> {
  constructor(instanceSettings: DataSourceInstanceSettings<FakerDataSourceOptions>) {
    super(instanceSettings);
  }

  async query(options: DataQueryRequest<FakerQuery>): Promise<DataQueryResponse> {
    const { range } = options;
    const data: DataFrame[] = [];

    options.targets.forEach((target: FakerQuery) => {
      if (!target.script) {
        return;
      }
      const lines = target.script.split('\n');
      const generatedData: any = {
        time: [] as number[], // Time
        data: lines.map(l => [] as any[]), // Lines
      };

      if (target.limit) {
        const elapsed = range!.to.valueOf() - range!.from.valueOf();
        options.intervalMs = elapsed / target.limit;
      }
      for (let time: number = range!.from.valueOf(), to: number = range!.to.valueOf(); time < to; time += options.intervalMs || 5000) {
        generatedData.time.push(time);
        lines.forEach((line, i) => {
          generatedData.data[i].push(faker.fake(line.split(' as ')[0]));
        });
      }

      const dataEntry: DataFrame = {
        refId: target.refId,
        fields: [
          {
            name: 'Time',
            type: FieldType.time,
            values: new ArrayVector(generatedData.time.map((t: number) => dateTime(t))),
            config: {},
          },
          ...lines.map((line, i) => {
            let type: FieldType = FieldType.string;
            if (!Number.isNaN(parseInt(generatedData.data[i][0], 10))) {
              type = FieldType.number;
            } else if (!Number.isNaN(parseFloat(generatedData.data[i][0]))) {
              type = FieldType.number;
            }

            let alias = line;
            const splitLine = line.split(' as ');
            if (splitLine.length === 1) {
              alias = splitLine[0];
            } else {
              alias = splitLine[1];
            }
            return {
              name: alias,
              type,
              values: new ArrayVector(generatedData.data[i]),
              config: {},
            };
          }),
        ],
        length: generatedData.time.length,
      };

      data.push(dataEntry);
    });

    // Return a constant for each query.
    return { data };
  }

  importQueries(queries: FakerQuery[], originMeta: PluginMeta): Promise<FakerQuery[]> {
    console.log('import queries', queries, originMeta);
    return Promise.resolve(queries);
  }

  async testDatasource() {
    // Implement a health check for your data source.

    return {
      status: 'success',
      message: 'Success',
    };
  }
}
