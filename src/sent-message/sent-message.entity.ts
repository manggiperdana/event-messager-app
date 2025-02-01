import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SentMessage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  email: string;

  @Column()
  eventType: string;

  @Column()
  message: string;

  @Column()
  sentYear: string;

  @Column()
  location: string;

  @Column({ default: false })
  resolved: boolean;
}
