import { DataFrame, DataService, DataQuery, logger } from '@grafana/tsbackend';
import { FieldType, ArrayVector, dateTime } from '@grafana/data';
import { FakerQuery, FakerDataSourceOptions } from '../shared/types';
import * as faker from 'faker';

export class FakerDataService extends DataService<FakerQuery, FakerDataSourceOptions> {
  constructor() {
    super();
  }

  QueryData(request: DataQuery<FakerQuery>): Promise<DataFrame[]> {
    const data: DataFrame[] = [];
    const { timerange, query, intervalms, refid } = request;
    if (!query.script) {
      return Promise.resolve(data);
    }
    const lines: string[] = query.script.split('\n');
    const generatedData: any = {
      time: [] as number[], // Time
      data: lines.map((l: string) => [] as any[]), // Lines
    };

    if (!timerange) {
      return Promise.resolve(data);
    }

    for (let time: number = timerange.fromepochms; time < timerange.toepochms; time += intervalms) {
      // Value must be nanosecond resolution
      generatedData.time.push(time * 1000);
      lines.forEach((line, i) => {
        generatedData.data[i].push(faker.fake(line.split(' as ')[0]));
      });
    }

    const dataEntry: DataFrame = {
      refId: refid,
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
    return Promise.resolve(data);
  }
}