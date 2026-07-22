import { DataSource } from 'typeorm';
import { Genre } from './modules/genre/genre.entity';
import { Movie } from './modules/movie/movie.entity';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Genre, Movie],
  synchronize: true,
});

function parseRuntime(runtime: string): number {
  const match = runtime.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function parseRating(rating: string): number {
  const parsed = parseFloat(rating);
  return isNaN(parsed) ? 0 : parsed;
}

const shouldReset = process.argv.includes('--reset');

async function seed() {
  await AppDataSource.initialize();

  const genreRepo = AppDataSource.getRepository(Genre);
  const movieRepo = AppDataSource.getRepository(Movie);

  const movieCount = await movieRepo.count();
  if (movieCount > 0 && !shouldReset) {
    console.log('Database already seeded, skipping. Use --reset to reseed.');
    await AppDataSource.destroy();
    return;
  }

  if (shouldReset) {
    console.log('Resetting existing data...');
    await AppDataSource.query('DELETE FROM movie_related');
    await AppDataSource.query('DELETE FROM movie_genres');
    await AppDataSource.query('TRUNCATE TABLE movie RESTART IDENTITY CASCADE');
  }

  const genreNames: string[] = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/genres.json'), 'utf-8'),
  );

  const genreMap: Record<string, Genre> = {};
  for (const name of genreNames) {
    let genre = await genreRepo.findOneBy({ name });
    if (!genre) {
      genre = genreRepo.create({ name });
      genre = await genreRepo.save(genre);
    }
    genreMap[name] = genre;
  }

  const moviesFile = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../data/movies.json'), 'utf-8'),
  );
  const rawMovies = moviesFile.movies;

  const savedMovies: Movie[] = [];

  for (const raw of rawMovies) {
    const movieGenreNames: string[] = (raw.Genre as string)
      .split(',')
      .map((g: string) => g.trim())
      .filter((g: string) => genreMap[g]);

    if (movieGenreNames.length === 0) continue;

    const existing = await movieRepo.findOneBy({ title: raw.Title });
    if (existing) {
      savedMovies.push(existing);
      continue;
    }

    const movie = movieRepo.create({
      title: raw.Title,
      description: raw.Plot,
      rating: parseRating(raw.imdbRating),
      lengthMinutes: parseRuntime(raw.Runtime),
      year: parseInt(raw.Year, 10),
      posterUrl: raw.Poster,
      genres: movieGenreNames.map((g) => genreMap[g]),
    });

    savedMovies.push(await movieRepo.save(movie));
  }

  for (const movie of savedMovies) {
    const movieGenreIds = new Set((movie.genres ?? []).map((g) => g.id));

    movie.relatedMovies = savedMovies
      .filter(
        (m) =>
          m.id !== movie.id &&
          (m.genres ?? []).some((g) => movieGenreIds.has(g.id)),
      )
      .slice(0, 15);

    await movieRepo.save(movie);
  }

  console.log(`Seed complete: ${savedMovies.length} movies inserted.`);
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
