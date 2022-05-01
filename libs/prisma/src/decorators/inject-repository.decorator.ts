import { Inject } from '@nestjs/common';

export const InjectRepository = (model: new (...args: Array<any>) => any) =>
  Inject(model);
