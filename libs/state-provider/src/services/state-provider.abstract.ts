import { Injectable } from '@nestjs/common';
import { BaseState, IStateProvider } from '../interfaces';
import { Filter } from '../interfaces/filter.model';

@Injectable()
export abstract class StateProvider implements IStateProvider {
  abstract get<T extends BaseState>(id: string | number): Promise<T>;
  abstract getMany<T extends BaseState>(filter?: Filter<T>): Promise<Array<T>>;
  abstract save<T extends BaseState>(data: T): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
