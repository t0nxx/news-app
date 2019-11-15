import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsAlpha, IsAlphanumeric, IsString } from "class-validator";

export class SourceDto {
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    link: string;

    backgroundImage: string;

}
