import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: DatabaseService) {}


  async create(data: Prisma.NoteCreateInput) {
    return this.prisma.note.create({ data });
  }

  async findAll() {
    return this.prisma.note.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    return this.prisma.note.findUnique({ where: { id } });
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
