import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './user/user.module';
import { BirthdayModule } from './event/event.module';
import { SentMessageModule } from './sent-message/sent-message.module';
import { CronModule } from './cron/cron.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'event-messager-app.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    CronModule,
    UserModule,
    BirthdayModule,
    SentMessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
