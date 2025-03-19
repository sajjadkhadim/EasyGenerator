import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'test@example.com', description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test User', description: 'User name' })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 'Password123!', description: 'User password' })
  @IsString()
  @MinLength(8)
  password: string;
}