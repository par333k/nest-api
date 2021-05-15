import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => { // beforeAll로 하면 테스트마다 앱이 생성되지 않고 하나의 앱을 생성 후 계속 상태를 유지한다.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    // 테스트용 앱 생성
    // 이것도 운영환경과 일치시켜줘야만 같은 결과를 예상할 수 있다.
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes( // express의 미들웨어와 비슷함, 전역 범위 파이프
      new ValidationPipe({
        whitelist: true, // validation을 위한 decorator가 붙어있지 않은 속성들은 제거
        forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
        transform: true, // 요청에서 넘어온 자료들의 형변환, 가령 url의 파라미터는 string으로 올때가 많은데 이걸 자동으로 원하는 형태로 바꿔줌
      })
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome movie api');
  });

  describe("/movies", () => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([]);
    });
    it("POST", () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test'],
      })
      .expect(201);
    });
    it("POST 400", () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title: 'Test',
        year: 2000,
        genres: ['test'],
        other: 'thing'
      })
      .expect(400);
    });
    it("DELETE", () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    })
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get("/movies/1")
      .expect(200);
    });
    it('PATCH 200', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });
    it('DELETE 200', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200);
    });
    
  })

});
