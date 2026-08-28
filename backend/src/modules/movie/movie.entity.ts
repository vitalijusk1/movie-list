import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Genre } from '../genre/genre.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column('text')
  description!: string;

  @Column('decimal', { precision: 3, scale: 1 })
  rating!: number;

  @Column()
  lengthMinutes!: number;

  @Column({ nullable: true })
  posterUrl?: string;

  @Column({ nullable: true })
  year?: number;

  @ManyToMany(() => Genre, (genre) => genre.movies, { eager: true })
  @JoinTable({ name: 'movie_genres' })
  genres!: Genre[];

  @ManyToMany(() => Movie, (movie) => movie.relatedTo)
  @JoinTable({ name: 'movie_related' })
  relatedMovies!: Movie[];

  @ManyToMany(() => Movie, (movie) => movie.relatedMovies)
  relatedTo!: Movie[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
