import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LoginUserDTO {


@ApiModelProperty({
    description: '',
    example: '',
})
email: string;

@ApiModelProperty({
    description: '',
    example: '',
})
password: string;

}