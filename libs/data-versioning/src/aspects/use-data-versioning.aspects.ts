import { Type, UseInterceptors } from '@nestjs/common';
import { IncludeDataVersions, CreateDataVersion } from '../interceptors';

export const UseDataVersioning = <T extends { id: string | number }>(
  model: Type<T>,
) => UseInterceptors(IncludeDataVersions(model), CreateDataVersion(model));
