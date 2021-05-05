import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return '모든 영화 리턴';
  }

  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `우리는 영화 검색할거야 언제 연도이후인지 : ${searchingYear}`;
  }

  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `영화 한개 리턴 with the id: ${movieId}`;
  }

  @Post()
  create(@Body() movieData) {
    console.log(movieData);
    return '영화를 만들자';
  }

  @Delete('/:id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie whth id : ${movieId}`;
  }

  @Patch('/:id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
