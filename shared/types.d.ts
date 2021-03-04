import { DataQuery, DataSourceJsonData } from '@grafana/data';
export interface FakerQuery extends DataQuery {
    script: string;
    limit: number;
}
export interface FakerDataSourceOptions extends DataSourceJsonData {
}
