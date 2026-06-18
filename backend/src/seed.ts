import { DataSource } from 'typeorm';
import { Genre } from './modules/genre/genre.entity';
import { Movie } from './modules/movie/movie.entity';
import * as dotenv from 'dotenv';

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

async function seed() {
  await AppDataSource.initialize();

  const genreRepo = AppDataSource.getRepository(Genre);
  const movieRepo = AppDataSource.getRepository(Movie);

  const genreNames = [
    'Action',
    'Drama',
    'Sci-Fi',
    'Thriller',
    'Comedy',
    'Crime',
    'Adventure',
    'Animation',
  ];

  const genres: Record<string, Genre> = {};
  for (const name of genreNames) {
    let genre = await genreRepo.findOneBy({ name });
    if (!genre) {
      genre = genreRepo.create({ name });
      genre = await genreRepo.save(genre);
    }
    genres[name] = genre;
  }

  const moviesData = [
    {
      title: 'Inception',
      description:
        'A skilled thief is offered a chance to have his criminal record erased if he can successfully perform inception — planting an idea into a target\'s subconscious.',
      rating: 8.8,
      lengthMinutes: 148,
      year: 2010,
      posterUrl: 'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      genres: ['Action', 'Sci-Fi', 'Thriller'],
    },
    {
      title: 'The Dark Knight',
      description:
        'Batman raises the stakes in his war on crime by pursuing the Joker, a criminal mastermind who plunges Gotham City into anarchy.',
      rating: 9.0,
      lengthMinutes: 152,
      year: 2008,
      posterUrl: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      genres: ['Action', 'Crime', 'Drama'],
    },
    {
      title: 'Interstellar',
      description:
        'A team of explorers travel through a wormhole in space in an attempt to ensure humanity\'s survival as Earth faces a global famine.',
      rating: 8.7,
      lengthMinutes: 169,
      year: 2014,
      posterUrl: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      genres: ['Sci-Fi', 'Drama', 'Adventure'],
    },
    {
      title: 'Pulp Fiction',
      description:
        'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
      rating: 8.9,
      lengthMinutes: 154,
      year: 1994,
      posterUrl: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
      genres: ['Crime', 'Drama', 'Thriller'],
    },
    {
      title: 'The Matrix',
      description:
        'A computer programmer discovers that reality as he knows it is a simulation run by machines, and joins a rebellion to break free.',
      rating: 8.7,
      lengthMinutes: 136,
      year: 1999,
      posterUrl: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      genres: ['Action', 'Sci-Fi'],
    },
    {
      title: 'Fight Club',
      description:
        'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into something much more dangerous.',
      rating: 8.8,
      lengthMinutes: 139,
      year: 1999,
      posterUrl: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
      genres: ['Drama', 'Thriller'],
    },
    {
      title: 'Forrest Gump',
      description:
        'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an extraordinary life.',
      rating: 8.8,
      lengthMinutes: 142,
      year: 1994,
      posterUrl: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      genres: ['Drama', 'Comedy'],
    },
    {
      title: 'The Shawshank Redemption',
      description:
        'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      rating: 9.3,
      lengthMinutes: 142,
      year: 1994,
      posterUrl: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      genres: ['Drama', 'Crime'],
    },
    {
      title: 'Goodfellas',
      description:
        'The story of Henry Hill and his life in the mob, covering his career from teenage errand boy to adult crime boss, covering the years 1955 to 1980.',
      rating: 8.7,
      lengthMinutes: 146,
      year: 1990,
      posterUrl: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
      genres: ['Crime', 'Drama'],
    },
    {
      title: 'Spirited Away',
      description:
        'During her family\'s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, where humans are changed into beasts.',
      rating: 8.6,
      lengthMinutes: 125,
      year: 2001,
      posterUrl: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
      genres: ['Animation', 'Adventure'],
    },
  ];

  const savedMovies: Movie[] = [];

  for (const data of moviesData) {
    const existing = await movieRepo.findOneBy({ title: data.title });
    if (existing) {
      savedMovies.push(existing);
      continue;
    }

    const movie = movieRepo.create({
      title: data.title,
      description: data.description,
      rating: data.rating,
      lengthMinutes: data.lengthMinutes,
      year: data.year,
      posterUrl: data.posterUrl,
      genres: data.genres.map((g) => genres[g]),
    });

    savedMovies.push(await movieRepo.save(movie));
  }

  const relatedMap: Record<string, string[]> = {
    Inception: ['The Matrix', 'Interstellar', 'The Dark Knight'],
    'The Dark Knight': ['Inception', 'Fight Club', 'Goodfellas'],
    Interstellar: ['Inception', 'The Matrix', 'Spirited Away'],
    'Pulp Fiction': ['Fight Club', 'Goodfellas', 'The Shawshank Redemption'],
    'The Matrix': ['Inception', 'Interstellar', 'Fight Club'],
    'Fight Club': ['Pulp Fiction', 'The Dark Knight', 'The Shawshank Redemption'],
    'Forrest Gump': ['The Shawshank Redemption', 'Goodfellas'],
    'The Shawshank Redemption': ['Forrest Gump', 'Pulp Fiction', 'Goodfellas'],
    Goodfellas: ['Pulp Fiction', 'The Shawshank Redemption', 'The Dark Knight'],
    'Spirited Away': ['Interstellar', 'Forrest Gump'],
  };

  for (const movie of savedMovies) {
    const relatedTitles = relatedMap[movie.title] ?? [];
    movie.relatedMovies = savedMovies.filter((m) =>
      relatedTitles.includes(m.title),
    );
    await movieRepo.save(movie);
  }

  console.log('Seed complete: genres and movies inserted.');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
