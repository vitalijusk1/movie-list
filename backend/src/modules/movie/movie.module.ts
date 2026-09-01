import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Movie])],
  providers: [MovieService, JwtAuthGuard],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
