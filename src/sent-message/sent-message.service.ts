import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SentMessage } from './sent-message.entity';
import { User } from 'src/user/user.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SentMessageService {
  constructor(
    @InjectRepository(SentMessage)
    private sentMessageRepository: Repository<SentMessage>,
    private readonly httpService: HttpService,
  ) {}

  async create(createSentMessage: SentMessage): Promise<void> {
    const exist = await this.findUnresolved(createSentMessage);
    if (exist.length <= 0) {
      const user = this.sentMessageRepository.create(createSentMessage);
      this.sentMessageRepository.save(user);
    }
  }

  async findUnresolved(filter: any) {
    const newFilter = { ...filter };
    delete newFilter.id;
    newFilter.resolved = false;
    return await this.sentMessageRepository.find({ where: newFilter });
  }

  async setUnresolvedToTrue(filter: any) {
    const newFilter = { ...filter };
    delete newFilter.id;
    newFilter.resolved = false;
    const sentMessage = await this.sentMessageRepository.findOne({
      where: newFilter,
    });
    if (sentMessage) {
      sentMessage.resolved = true;
      await this.sentMessageRepository.save(sentMessage);
    }
  }

  public async sendBirthdayMessage(
    userData: User,
    sentYear: string,
    eventType: string,
  ) {
    const message = `Hey, ${userData.firstName} ${userData.lastName} it’s your birthday`;
    const creatSentMessageData = this.createSentData(
      userData,
      sentYear,
      eventType,
      message,
    );
    this.executeSend(creatSentMessageData);
  }

  // For Anniversary
  // public async sendAnniversaryMessage(
  //   userData: User,
  //   sentYear: string,
  //   eventType: string,
  // ) {
  //   const message = `Hey, ${userData.firstName} ${userData.lastName} it’s your anniversary`;
  //   const creatSentMessageData = this.createSentData(
  //     userData,
  //     sentYear,
  //     eventType,
  //     message,
  //   );
  //   this.executeSend(creatSentMessageData);
  // }

  public async findResolvedBirthdayEventUserId(
    year: string,
  ): Promise<number[]> {
    const ids = await this.sentMessageRepository.find({
      select: { userId: true },
      where: { sentYear: `${year}`, eventType: 'birthday', resolved: true },
    });
    return ids.map((sentMessage) => sentMessage.userId);
  }

  // For Anniversary
  // public async findResolvedAnniversaryEventUserId(
  //   year: string,
  // ): Promise<number[]> {
  //   const ids = await this.sentMessageRepository.find({
  //     select: { userId: true },
  //     where: { sentYear: `${year}`, eventType: 'anniversary', resolved: true },
  //   });
  //   return ids.map((sentMessage) => sentMessage.userId);
  // }

  private createSentData(
    userData: User,
    sentYear: string,
    eventType: string,
    message: string,
  ) {
    // Destructure, rename keys, and wrap into a new object
    return (({ id, email, location }) => ({
      id: null,
      userId: id,
      email,
      message,
      sentYear,
      location,
      eventType,
      resolved: true,
    }))(userData);
  }

  private async executeSend(creatSentMessageData: SentMessage) {
    const url = 'https://email-service.digitalenvision.com.au/';
    try {
      const response = await firstValueFrom(
        this.httpService.post(url, {
          email: creatSentMessageData.email,
          message: creatSentMessageData.message,
        }),
      );
      if (response.data.status == 200) {
        const exist = await this.findUnresolved(creatSentMessageData);
        if (exist.length <= 0) {
          this.create(creatSentMessageData);
        } else {
          this.setUnresolvedToTrue(creatSentMessageData);
        }
      }
    } catch (error) {
      creatSentMessageData.resolved = false;
      this.create(creatSentMessageData);
      console.log(error.status);
    }
  }
}
