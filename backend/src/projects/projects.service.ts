import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProjectsService {
  constructor(private prisma: DatabaseService) {}


  async create(data: Prisma.ProjectCreateInput) {
    return this.prisma.project.create({ data });
  }

  async findAll() {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.project.findUnique({ where: { id } });
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
