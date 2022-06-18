export interface IPublisher {
  publish<T = any>(topic: string, data: T): Promise<boolean>;
}
