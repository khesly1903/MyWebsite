import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiTags, ApiOperation, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new project' })
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  findAll(@Query('all') all?: string) {
    return this.projectsService.findAll(all === 'true');
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single project by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the project' })
  findOne(@Param('id') id: string, @Query('all') all?: string) {
    return this.projectsService.findOne(id, all === 'true');
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a project' })
  @ApiParam({ name: 'id', description: 'The ID of the project to update' })
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', description: 'The ID of the project to delete' })
  remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}
