import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './genre.entity';
import { GenreService } from './genre.service';
import { GenreController } from './genre.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Genre])],
  providers: [GenreService, JwtAuthGuard],
  controllers: [GenreController],
  exports: [TypeOrmModule],
})
export class GenreModule {}
