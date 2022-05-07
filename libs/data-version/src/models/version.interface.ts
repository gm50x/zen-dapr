export interface IVersion<T> {
  owner?: any;
  key: string;
  id: string;
  versionId: string;
  timestamp: Date;
  type: string;
  data: T;
}
