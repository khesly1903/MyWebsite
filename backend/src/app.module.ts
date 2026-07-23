import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { ProjectsModule } from './projects/projects.module';
import { NotesModule } from './notes/notes.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, ArticlesModule, ProjectsModule, NotesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
