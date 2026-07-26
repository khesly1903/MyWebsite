import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class CreateContactDto {
  @ApiProperty({ example: 'Jane Doe' })
  @IsString()
  @MinLength(1)
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'jane@example.com' })
  @IsEmail()
  @MaxLength(200)
  email: string;

  @ApiProperty({ example: 'Hi, I would like to discuss a project...' })
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  message: string;

  @ApiProperty({ required: false, description: 'Honeypot field — must stay empty. Filled-in submissions are silently dropped as spam.' })
  @IsOptional()
  @IsString()
  website?: string;
}
