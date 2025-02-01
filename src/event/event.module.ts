import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { UserModule } from '../user/user.module';
import { SentMessageModule } from '../sent-message/sent-message.module';

@Module({
  imports: [UserModule, SentMessageModule],
  providers: [EventService],
  exports: [EventService],
})
export class BirthdayModule {}
