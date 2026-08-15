import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
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

  @Post()
  create(@Body() dto: CreateMovieDto) {
    return this.movieService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateMovieDto>,
  ) {
    return this.movieService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.movieService.remove(id);
  }
}
