import { Injectable } from '@nestjs/common';
import { IPublisher } from '../models';

@Injectable()
export abstract class Publisher implements IPublisher {
  abstract publish<T>(topic: string, data: T): Promise<boolean>;
}
