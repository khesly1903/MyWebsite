import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsOptional } from 'class-validator';

export class CreateArticleDto {
  @ApiProperty({ example: 'my-first-article', description: 'The unique slug for the article' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'My First Article', description: 'Title of the article' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'This is a short description...', description: 'A brief summary of the article' })
  @IsString()
  description: string;

  @ApiProperty({ example: '# Hello World\nThis is markdown content...', description: 'Markdown content of the article' })
  @IsString()
  content: string;

  @ApiProperty({ example: 'https://r2.example.com/cover.png', required: false })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({ example: true, required: false, default: false })

  @IsBoolean()
  @IsOptional()
  published?: boolean;
}

