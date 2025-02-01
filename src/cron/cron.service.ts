import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';
import { EventService } from 'src/event/event.service';
import { SentMessageService } from 'src/sent-message/sent-message.service';

@Injectable()
export class CronService {
  private timeAt = '09:00';
  private now = moment();
  private targetTime = moment(this.timeAt, 'HH:mm'); //Target time: 09:00 AM

  constructor(
    private readonly eventService: EventService,
    private readonly sentMessageService: SentMessageService,
  ) {}

  // Birthday Event Scheduler
  @Cron('*/5 * * * *') //run every 5 minutes
  async BirthdaySheduleMessages(): Promise<void> {
    if (this.now.isSameOrAfter(this.targetTime)) {
      const eventType = 'birthday';
      const birthday = await this.eventService.getUsersWithBirthday();
      birthday.map((data) =>
        this.sentMessageService.sendBirthdayMessage(
          data,
          this.now.format('YYYY'),
          eventType,
        ),
      );
    }
  }

  // Anniversary Event Scheduler
  // @Cron('*/5 * * * * *')
  // async AnniversarySheduleMessages(): Promise<void> {
  //   if (this.now.isSameOrAfter(this.targetTime)) {
  //     const eventType = 'anniversary';
  //     const anniversary = await this.eventService.getUsersWithAnniversary();
  //     anniversary.map((data) =>
  //       this.sentMessageService.sendAnniversaryMessage(
  //         data,
  //         this.now.format('YYYY'),
  //         eventType,
  //       ),
  //     );
  //   }
  // }
}
