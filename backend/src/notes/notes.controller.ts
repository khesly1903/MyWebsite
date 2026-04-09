import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@ApiTags('Notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all notes' })
  findAll() {
    return this.notesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single note by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the note' })
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a note' })
  @ApiParam({ name: 'id', description: 'The ID of the note to update' })
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a note' })
  @ApiParam({ name: 'id', description: 'The ID of the note to delete' })
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
