import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Matches,
  IsJSON,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SaveUserDto {
  @ApiProperty({
    description: 'userId',
    example: 'sgh41232',
  })
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
  @MinLength(4, { message: 'Id must be at least 8 characters long' })
  @MaxLength(14, { message: 'Id must be less than 20 characters long' })
  userId: string;

  @ApiProperty({
    description: 'password',
    example: 'sgh4123SGH!',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(20, { message: 'Password must be less than 20 characters long' })
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/, {
    message:
      'Password too weak. Must contain upper and lower case letters, a number, and a special character.',
  })
  password: string;

  @ApiProperty({
    description: 'nickname',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;
}
