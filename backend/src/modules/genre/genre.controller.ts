import { Controller, Get, UseGuards } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }
}
