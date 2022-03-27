import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SubscriptionsContainer, subscriptions } from './containers';
import { SubscriptionsController } from './controllers';
import { Subscription } from './models';
import { DaprClientService, DaprService } from './services';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })],
  providers: [SubscriptionsContainer, DaprService, DaprClientService],
  exports: [DaprService],
})
export class DaprModule {
  static subscribe(
    subscription: Array<Subscription | string> | Subscription | string,
  ) {
    const mapSubscription = (subs: string | Subscription): Subscription =>
      typeof subs === 'string' ? { route: subs, topic: subs } : { ...subs };

    if (Array.isArray(subscription)) {
      subscriptions.push(...subscription.map(mapSubscription));
    } else {
      subscriptions.push(mapSubscription(subscription));
    }

    return {
      module: DaprModule,
      controllers: [SubscriptionsController()],
      providers: [
        {
          provide: SubscriptionsContainer,
          useValue: subscriptions,
        },
      ],
    };
  }
}
