import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: DatabaseService) {}


  async create(data: Prisma.ProjectCreateInput) {
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
    return this.prisma.project.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.project.delete({ where: { id } });
  }
}
