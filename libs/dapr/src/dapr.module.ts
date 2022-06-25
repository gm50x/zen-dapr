import { HttpModule } from '@nestjs/axios';
import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionsContainer, subscriptions } from './containers';
import { SubscriptionsController } from './controllers';
import { Subscription } from './models';
import { DaprClientService, DaprService } from './services';

const mapSubscription = (
  subs: string | [string, string] | Subscription,
): Subscription => {
  if (typeof subs === 'string') {
    return { topic: subs, route: subs };
  }

  if (Array.isArray(subs)) {
    const [topic, route] = subs;
    return { topic, route };
  }

  return { ...subs };
};

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [SubscriptionsContainer, DaprClientService, DaprService],
  exports: [DaprService],
})
export class DaprModule {
  static subscribe(
    ...subscription: Array<Subscription | [string, string] | string>
  ): DynamicModule {
    subscriptions.push(...subscription.map(mapSubscription));

    return {
      module: DaprModule,
      controllers: [SubscriptionsController],
      providers: [
        {
          useValue: subscriptions,
          provide: SubscriptionsContainer,
        },
      ],
    };
  }
}
