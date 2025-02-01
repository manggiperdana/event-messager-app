import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  birthday: string; // Birthday

  // @Column()
  // anniversary: string; // Anniversary

  @Column()
  location: string; // Timezone string (e.g., 'America/New_York')
}
