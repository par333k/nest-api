import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreatMovieDto } from "./create-movie.dto";
// PartialType 이용을 위해 @nestjs/mapped-types 설치
export class UpdateMovieDto extends PartialType(CreatMovieDto) {
    // PartialType을 사용해 상속하면 직접 입력할 필요가 없다
    // @IsString()
    // readonly title?: string; // 물음표 붙으면 필수가 아님
    
    // @IsNumber()
    // readonly year?: number;

    // @IsString({ each: true })// 각각 요소를 다 검사함
    // readonly genres?: string[];
}