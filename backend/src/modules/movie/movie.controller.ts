import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MovieService } from './movie.service';
import { GetMoviesQueryDto } from './dto/get-movies-query.dto';

@UseGuards(JwtAuthGuard)
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('sort-options')
  getSortOptions() {
    return this.movieService.getSortOptions();
  }

  @Get()
  findAll(@Query() query: GetMoviesQueryDto) {
    return this.movieService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.findOne(id);
  }
}
