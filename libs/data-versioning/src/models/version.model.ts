import { Type } from '@nestjs/common';

import { randomUUID } from 'crypto';

export class Version<T> {
  owner?: any;
  key: string;
  id: string;
  versionId: string;
  timestamp: Date;
  type: string;
  data: T;

  constructor(opts: Partial<Omit<Version<T>, 'type'>> & { type: Type<T> }) {
    const defaultValues = {
      id: randomUUID(),
      owner: 'unknown',
      timestamp: new Date(),
    };
    const type = { type: opts.type.name };
    Object.assign(this, defaultValues, opts, { type });
  }
}
