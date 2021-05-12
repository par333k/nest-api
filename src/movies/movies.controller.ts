import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query, Req, Res
} from "@nestjs/common";
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity'; 
import { CreatMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  // Nest.js는 Express 위에서 돌아가기 때문에 Express의 req, res객체에도 접근이 가능하다.
  @Get() // 아래처럼
  getAll(@Req() req, @Res() res): Movie[] {
    // req나 res 를 직접 nestjs에서 컨트롤 하는건 좋은 방법이 아니다.
    // nest.js는 fastify와도 호환이 되기 때문에, express의 객체를 직접 쓰면 충돌이 날 수 있다.
    // fastify는 성능에 상당한 이점이 있다.
    return this.movieService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') movieId: number): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreatMovieDto) {
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.update(movieId, updateData);
  }
}
