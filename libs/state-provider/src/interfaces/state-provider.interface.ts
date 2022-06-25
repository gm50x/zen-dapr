import { BaseState } from './base-state.model';
import { Filter } from './filter.model';

export interface IStateProvider {
  get<T extends BaseState>(id: string): Promise<T>;
  getMany<T extends BaseState>(filter?: Filter<T>): Promise<Array<T>>;
  save<T extends BaseState>(data: T): Promise<void>;
  delete(id: string): Promise<void>;
}
