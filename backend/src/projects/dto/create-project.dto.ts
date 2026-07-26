import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsArray, IsOptional, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ example: 'My Awesome Project' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A brief description of the project' })
  @IsString()
  description: string;

  @ApiProperty({ example: '# Project Details\nBuilt with NestJS...', required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ example: 'https://r2.example.com/project-cover.png', required: false })
  @IsString()
  @IsOptional()
  coverImage?: string;

  @ApiProperty({ example: 'https://myproject.com', required: false })

  @IsUrl()
  @IsOptional()
  link?: string;

  @ApiProperty({ example: 'https://github.com/user/repo', required: false })
  @IsUrl()
  @IsOptional()
  github?: string;

  @ApiProperty({ example: true, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @ApiProperty({ example: false, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiProperty({ example: false, required: false, default: false, description: 'Whether this project is shown as the hero on the Projects page. Only one project can be the hero at a time.' })
  @IsBoolean()
  @IsOptional()
  isHero?: boolean;
}

