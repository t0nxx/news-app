import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsAlpha, IsAlphanumeric } from "class-validator";

export class CategoryDto {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsAlphanumeric()
    name: string;

}
