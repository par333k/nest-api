import { Controller, Get } from "@nestjs/common";

@Controller('')
export class AppController {
  @Get()
  home() {
    return '환영 영화 api';
  }
}
