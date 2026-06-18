import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Movie } from './movie.entity';
import { Genre } from '../genre/genre.entity';
import { CreateMovieDto } from './dto/create-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  async findAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['genres', 'relatedMovies'],
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['genres', 'relatedMovies', 'relatedMovies.genres'],
    });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const genres = await this.genreRepository.findBy({
      id: In(dto.genreIds),
    });

    const relatedMovies =
      dto.relatedMovieIds && dto.relatedMovieIds.length
        ? await this.movieRepository.findBy({ id: In(dto.relatedMovieIds) })
        : [];

    const movie = this.movieRepository.create({
      title: dto.title,
      description: dto.description,
      rating: dto.rating,
      lengthMinutes: dto.lengthMinutes,
      posterUrl: dto.posterUrl,
      year: dto.year,
      genres,
      relatedMovies,
    });

    return this.movieRepository.save(movie);
  }

  async update(id: number, dto: Partial<CreateMovieDto>): Promise<Movie> {
    const movie = await this.findOne(id);

    if (dto.genreIds) {
      movie.genres = await this.genreRepository.findBy({
        id: In(dto.genreIds),
      });
    }

    if (dto.relatedMovieIds !== undefined) {
      movie.relatedMovies = dto.relatedMovieIds.length
        ? await this.movieRepository.findBy({ id: In(dto.relatedMovieIds) })
        : [];
    }

    Object.assign(movie, {
      ...(dto.title !== undefined && { title: dto.title }),
      ...(dto.description !== undefined && { description: dto.description }),
      ...(dto.rating !== undefined && { rating: dto.rating }),
      ...(dto.lengthMinutes !== undefined && {
        lengthMinutes: dto.lengthMinutes,
      }),
      ...(dto.posterUrl !== undefined && { posterUrl: dto.posterUrl }),
      ...(dto.year !== undefined && { year: dto.year }),
    });

    return this.movieRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const movie = await this.findOne(id);
    await this.movieRepository.remove(movie);
  }
}
