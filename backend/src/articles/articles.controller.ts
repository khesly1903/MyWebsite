import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@ApiTags('Articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new article' })
  @ApiResponse({ status: 201, description: 'The article has been successfully created.' })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({ status: 200, description: 'Return all articles.' })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single article by ID' })
  @ApiParam({ name: 'id', description: 'The ID of the article' })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(id);
  }

  @Get('slug/:slug')
  @ApiOperation({ summary: 'Get a single article by slug' })
  @ApiParam({ name: 'slug', description: 'The unique slug of the article' })
  findBySlug(@Param('slug') slug: string) {
    return this.articlesService.findBySlug(slug);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an article' })
  @ApiParam({ name: 'id', description: 'The ID of the article to update' })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an article' })
  @ApiParam({ name: 'id', description: 'The ID of the article to delete' })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(id);
  }
}
