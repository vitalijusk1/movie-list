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
}
