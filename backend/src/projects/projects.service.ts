import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: DatabaseService) {}


  async create(data: Prisma.ProjectCreateInput) {
    if (data.isHero) {
      return this.prisma.$transaction(async (tx) => {
        await tx.project.updateMany({ where: { isHero: true }, data: { isHero: false } });
        return tx.project.create({ data });
      });
    }
    return this.prisma.project.create({ data });
  }

  async findAll(all = false) {
    return this.prisma.project.findMany({
      where: all ? undefined : { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, all = false) {
    return this.prisma.project.findFirst({
      where: all ? { id } : { id, published: true },
    });
  }

  async update(id: string, data: Prisma.ProjectUpdateInput) {
    if (data.isHero) {
      return this.prisma.$transaction(async (tx) => {
        await tx.project.updateMany({ where: { isHero: true, NOT: { id } }, data: { isHero: false } });
        return tx.project.update({ where: { id }, data });
      });
    }
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
