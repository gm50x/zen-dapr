import { Injectable } from '@nestjs/common';
import { DaprService } from '@zen/dapr';
import { BaseDaprState, IStateProvider } from '../interfaces';
import { DaprState } from '../interfaces/dapr-state.model';
import { Filter } from '../interfaces/filter.model';
import { StateProvider } from './state-provider.abstract';

// TODO: Will be removed in future versions of dapr
const DAPR_STATE_PREFIX = 'value';

const flatten = (obj: any, parent?: any, res: any = {}) => {
  for (const key of Object.keys(obj)) {
    const propName = parent ? parent + '.' + key : key;

    if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
      flatten(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

const prefixed = (key: string, prefix = `${DAPR_STATE_PREFIX}.data`) =>
  `${prefix}.${key}`;

const parseValue = (key: string, value: any | Array<any>) => {
  if (Array.isArray(value)) {
    return value.map((x) => ({ [prefixed(key)]: x }));
  }
  return { [prefixed(key)]: value };
};

const parseFilterValue = (filter: any) => {
  const isMultipleFilterValue = Array.isArray(filter);
  if (isMultipleFilterValue) {
    return { OR: filter.map((x) => ({ EQ: x })) };
  }
  return { EQ: filter };
};

const parseFilter = <T>(data: Filter<T>) => {
  const flatData = flatten(data);
  const filters = [];
  const flatEntries = Object.entries<any>(flatData);

  for (const [key, value] of flatEntries) {
    filters.push(parseValue(key, value));
  }

  if (filters.length <= 1) {
    const [filter] = filters;
    return parseFilterValue(filter);
  }

  const AND: any = [];
  for (const filter of filters) {
    AND.push(parseFilterValue(filter));
  }

  return { AND };
};

const extractValue = <T>({ data }: DaprState<T>) => data;

@Injectable()
export class DaprStateService extends StateProvider implements IStateProvider {
  constructor(private readonly dapr: DaprService) {
    super();
  }

  async get<T extends BaseDaprState>(id: string | number): Promise<T> {
    return this.dapr.stateGet<DaprState<T>>(`${id}`).then(extractValue);
  }

  async getMany<T extends BaseDaprState>(
    filter?: Filter<T>,
  ): Promise<Array<T>> {
    return this.dapr
      .stateQuery<DaprState<T>>(filter ? { filter: parseFilter(filter) } : null)
      .then(([values]) => values.map(extractValue));
  }

  async save<T extends BaseDaprState>(data: T): Promise<void> {
    const { timeToLiveInSeconds, ...state } = data;
    const key = `${state.id}`;
    const value = { key, data: { ...state, id: key } };

    if (!timeToLiveInSeconds) {
      return this.dapr.stateSave([{ key, value }]);
    }

    await this.dapr.stateSaveTTL([
      {
        key,
        value,
        metadata: {
          ttlInSeconds: timeToLiveInSeconds,
        },
      },
    ]);
  }

  async delete(id: string): Promise<void> {
    this.dapr.stateDelete(id);
  }
}
