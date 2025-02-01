import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SentMessageService } from './sent-message.service';
import { SentMessage } from './sent-message.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SentMessage]), HttpModule],
  providers: [SentMessageService],
  exports: [SentMessageService],
})
export class SentMessageModule {}
