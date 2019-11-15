import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class TermsDto {
    @ApiModelProperty()
    @IsNotEmpty()
    body: string;

}
