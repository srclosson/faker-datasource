//@ts-ignore
import { DataQuery, DataSourceJsonData } from '@grafana/data/index.development.js';

export interface FakerQuery extends DataQuery {
  script: string;
  limit: number;
}
export interface FakerDataSourceOptions extends DataSourceJsonData {}
