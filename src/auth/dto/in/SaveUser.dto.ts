import {
  IsString,
  IsNotEmpty,
  Matches,
  IsJSON,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SaveUserDto {
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be less than 20 characters long' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password too weak. Must contain upper and lower case letters, a number, and a special character.',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;
}
