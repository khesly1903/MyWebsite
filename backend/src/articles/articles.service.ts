import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: DatabaseService) {}


  async create(data: Prisma.ArticleCreateInput) {
    return this.prisma.article.create({ data });
  }

  async findAll() {
    return this.prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async findBySlug(slug: string) {
    return this.prisma.article.findUnique({ where: { slug } });
  }

  async update(id: string, data: Prisma.ArticleUpdateInput) {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.article.delete({ where: { id } });
  }
}
