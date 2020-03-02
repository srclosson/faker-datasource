import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface FakerQuery extends DataQuery {
  script: string;
}
export interface FakerDataSourceOptions extends DataSourceJsonData {}
