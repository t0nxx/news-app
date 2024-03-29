import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsAlpha, IsAlphanumeric, IsString } from "class-validator";

export class CategoryDto {
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    backgroundImage: string;

}
