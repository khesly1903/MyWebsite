import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({ example: 'My Quick Note' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Content of the note in markdown...' })
  @IsString()
  content: string;

  @ApiProperty({ example: true, required: false, default: false })
  @IsBoolean()
  @IsOptional()
  published?: boolean;
}
