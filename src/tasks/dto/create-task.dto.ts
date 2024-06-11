import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @IsNotEmpty()
    descripcion : string

    @IsBoolean()
    status : boolean

}
