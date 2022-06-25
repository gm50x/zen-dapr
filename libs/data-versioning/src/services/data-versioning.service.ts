import { Injectable, Type } from '@nestjs/common';
import { StateProvider, BaseState } from '@zen/state-provider';
import { randomUUID } from 'crypto';
import { Version } from '../models';

@Injectable()
export class DataVersioningService {
  constructor(private readonly state: StateProvider) {}
  async createVersion<T extends BaseState>(
    model: Type<T>,
    data: T,
    owner: any = 'unknown',
  ) {
    const timestamp = new Date();
    const versionId = randomUUID();
    const key = `${versionId}__${model.name}__version`;

    const value = new Version<T>({
      key,
      id: `${data.id || ''}`,
      versionId,
      timestamp,
      owner,
      type: model,
      data,
    });

    await this.state.save(value);
  }

  async getVersions<T>(
    model: Type<T>,
    ...ids: Array<string>
  ): Promise<Array<Version<T>>> {
    const versions = await this.state.getMany<Version<T>>({
      id: ids,
      type: model.name,
    });

    return versions;
  }
}
