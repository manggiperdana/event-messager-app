import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { SentMessageModule } from 'src/sent-message/sent-message.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), SentMessageModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export for use in other modules
})
export class UserModule {}
