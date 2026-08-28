import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Between,
  FindOperator,
  ILike,
  In,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Movie } from './movie.entity';
import { Genre } from '../genre/genre.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { GetMoviesQueryDto } from './dto/get-movies-query.dto';

const SORT_DIRECTIONS: Record<string, 'ASC' | 'DESC'> = {
  asc: 'ASC',
  desc: 'DESC',
};

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  private static readonly SORT_OPTIONS = [
    { value: 'title-asc', label: 'Title (A-Z)' },
    { value: 'title-desc', label: 'Title (Z-A)' },
    { value: 'rating-desc', label: 'Rating (high to low)' },
    { value: 'rating-asc', label: 'Rating (low to high)' },
    { value: 'year-desc', label: 'Year (newest first)' },
    { value: 'year-asc', label: 'Year (oldest first)' },
  ];

  getSortOptions() {
    return MovieService.SORT_OPTIONS;
  }

  private buildSortOrder(
    sort: string | undefined,
  ): Record<string, 'ASC' | 'DESC'> | undefined {
    if (!sort) return undefined;
    const [field, direction] = sort.split('-');
    return { [field]: SORT_DIRECTIONS[direction] };
  }

  async findAll(query: GetMoviesQueryDto) {
    const { genreIds, search, minRating, maxRating, page, perPage, sort } =
      query;
    const currentPage = page ?? 1;
    const pageSize = perPage ?? 12;
    const order = this.buildSortOrder(sort);

    if (
      minRating !== undefined &&
      maxRating !== undefined &&
      minRating > maxRating
    ) {
      throw new BadRequestException(
        'minRating must be less than or equal to maxRating',
      );
    }

    let rating: FindOperator<number> | undefined;

    if (minRating !== undefined && maxRating !== undefined) {
      rating = Between(minRating, maxRating);
    } else if (minRating !== undefined) {
      rating = MoreThanOrEqual(minRating);
    } else if (maxRating !== undefined) {
      rating = LessThanOrEqual(maxRating);
    }

    const where = {
      ...(genreIds?.length && { genres: { id: In(genreIds) } }),
      ...(search && { title: ILike(`%${search}%`) }),
      ...(rating && { rating }),
    };

    const [movies, total] = await this.movieRepository.findAndCount({
      where,
      relations: ['genres'],
      skip: (currentPage - 1) * pageSize,
      take: pageSize,
      ...(order && { order }),
    });

    return { movies, total, page: currentPage, perPage: pageSize };
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
