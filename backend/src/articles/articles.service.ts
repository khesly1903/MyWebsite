import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: DatabaseService) {}


  async create(data: Prisma.ArticleCreateInput) {
    if (data.isHero) {
      return this.prisma.$transaction(async (tx) => {
        await tx.article.updateMany({ where: { isHero: true }, data: { isHero: false } });
        return tx.article.create({ data });
      });
    }
    return this.prisma.article.create({ data });
  }

  async findAll(all = false) {
    return this.prisma.article.findMany({
      where: all ? undefined : { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, all = false) {
    return this.prisma.article.findFirst({
      where: all ? { id } : { id, published: true },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.article.findFirst({ where: { slug, published: true } });
  }

  async update(id: string, data: Prisma.ArticleUpdateInput) {
    if (data.isHero) {
      return this.prisma.$transaction(async (tx) => {
        await tx.article.updateMany({ where: { isHero: true, NOT: { id } }, data: { isHero: false } });
        return tx.article.update({ where: { id }, data });
      });
    }
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.article.delete({ where: { id } });
  }
}
