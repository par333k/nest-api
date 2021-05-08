import { IsNumber, IsOptional, IsString } from "class-validator";
// Data Transfer Object
export class CreatMovieDto {
    @IsString()
    readonly title: string;

    @IsNumber()
    readonly year: number;
    
    @IsOptional() // class-validator
    @IsString({ each: true })// 각각 요소를 다 검사함
    readonly genres: string[];
}

// A Data Transfer Object is an object that is used to encapsulate data, and send it from one subsystem of an application to another.
// DTOs are most commonly used by the Services layer in an N-Tier application to transfer data between itself and the UI layer. 
// The main benefit here is that it reduces the amount of data that needs to be sent across the wire in distributed applications. 
// They also make great models in the MVC pattern.
// Another use for DTOs can be to encapsulate parameters for method calls. This can be useful if a method takes more than four or five parameters.
// When using the DTO pattern, you would also make use of DTO assemblers. The assemblers are used to create DTOs from Domain Objects, and vice versa.
// The conversion from Domain Object to DTO and back again can be a costly process. If you're not creating a distributed application,
// you probably won't see any great benefits from the pattern, as https://martinfowler.com/bliki/LocalDTO.html