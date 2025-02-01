import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as moment from 'moment-timezone';
import { User } from 'src/user/user.entity';

@Injectable()
export class EventService {
  constructor(private readonly userService: UserService) {}

  // Birthday Event
  public async getUsersWithBirthday(): Promise<User[]> {
    const now = moment.utc();
    return await this.userService.findUserBirthDay(
      `${now.format('YYYY')}-${now.format('MM')}-${now.format('DD')}`,
    );
  }

  // Anniversary Event
  // public async getUsersWithAnniversary(): Promise<User[]> {
  //   const now = moment.utc();
  //   return await this.userService.findUserAnniversary(
  //     `${now.format('YYYY')}-${now.format('MM')}-${now.format('DD')}`,
  //   );
  // }
}
