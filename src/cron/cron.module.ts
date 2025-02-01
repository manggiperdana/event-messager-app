import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { BirthdayModule } from 'src/event/event.module';
import { SentMessageModule } from 'src/sent-message/sent-message.module';

@Module({
  imports: [BirthdayModule, SentMessageModule],
  providers: [CronService],
  exports: [CronService],
})
export class CronModule {}
