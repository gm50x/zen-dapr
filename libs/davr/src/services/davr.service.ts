import { Injectable } from '@nestjs/common';
import { DaprService } from '@zen/dapr';
import { randomUUID } from 'crypto';
import { IVersion } from '../models';

type Constructor<T> = new (...args: Array<any>) => T;

@Injectable()
export class DavrService {
  constructor(private readonly dapr: DaprService) {}

  async createVersion<T extends { id: string }>(
    model: Constructor<T>,
    data: T,
    owner: any = 'unknown',
  ) {
    const timestamp = new Date();
    const versionId = randomUUID();
    const key = `${versionId}__${model.name}__version`;
    const value: IVersion<T> = {
      key,
      id: data.id,
      versionId,
      timestamp,
      owner,
      type: model.name,
      data,
    };

    await this.dapr.stateSave([{ key, value }]);
  }

  async getVersions<T>(
    model: Constructor<T>,
    id: string,
  ): Promise<Array<IVersion<T>>> {
    const [versions] = await this.dapr.stateQuery<IVersion<T>>({
      filter: {
        AND: [{ EQ: { 'value.id': id } }, { EQ: { 'value.type': model.name } }],
      },
    });

    return versions;
  }
}
