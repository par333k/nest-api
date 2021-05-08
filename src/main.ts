import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( // express의 미들웨어와 비슷함, 전역 범위 파이프
    new ValidationPipe({
      whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
      forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
      transform: true, // 요청에서 넘어온 자료들의 형변환, 가령 url의 파라미터는 string으로 올때가 많은데 이걸 자동으로 원하는 형태로 바꿔줌
    })
  );
  await  app.listen(3000);
}
bootstrap();
