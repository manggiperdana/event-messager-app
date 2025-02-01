import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Field firstName must be added' })
  firstName: string;

  @IsString()
  @IsNotEmpty({ message: 'Field lastName must be added' })
  lastName: string;

  @IsString()
  @IsNotEmpty({ message: 'Field email must be added' })
  email: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Field birthday must be added' })
  birthday: string;

  @IsString()
  @IsNotEmpty({ message: 'Field location must be added' })
  location: string;
}
