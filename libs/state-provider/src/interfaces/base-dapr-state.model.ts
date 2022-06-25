import { BaseState } from './base-state.model';

export class BaseDaprState extends BaseState {
  key?: string;
  timeToLiveInSeconds?: string;
}
