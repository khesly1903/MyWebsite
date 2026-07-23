import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: DatabaseService) {}


  async create(data: Prisma.NoteCreateInput) {
    return this.prisma.note.create({ data });
  }

  async findAll(all = false) {
    return this.prisma.note.findMany({
      where: all ? undefined : { published: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, all = false) {
    return this.prisma.note.findFirst({
      where: all ? { id } : { id, published: true },
    });
  }

  async update(id: string, data: Prisma.NoteUpdateInput) {
    return this.prisma.note.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.note.delete({ where: { id } });
  }
}
