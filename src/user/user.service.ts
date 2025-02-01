import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Not, In } from 'typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SentMessageService } from 'src/sent-message/sent-message.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly sentMessageService: SentMessageService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }

  async findUserBirthDay(dateData: string): Promise<User[]> {
    const [year, month, date] = dateData.split('-');
    const userIds =
      await this.sentMessageService.findResolvedBirthdayEventUserId(year);
    return this.userRepository.find({
      where: { birthday: Like(`%-${month}-${date}`), id: Not(In(userIds)) },
    });
  }
  // Anniversary
  // async findUserAnniversary(dateData: string): Promise<User[]> {
  //   const [year, month, date] = dateData.split('-');
  //   const userIds = await this.sentMessageService.findResolvedAnniversaryEventUserId(year);
  //   return this.userRepository.find({
  //     where: { anniversary: Like(`%-${month}-${date}`), id: Not(In(userIds)) },
  //   });
  // }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
