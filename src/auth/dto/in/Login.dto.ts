import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'userId',
    example: 'sgh41232',
  })
  @IsString()
  @IsNotEmpty({ message: 'User ID is required' })
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
}
