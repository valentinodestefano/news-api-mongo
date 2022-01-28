import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDTO {


@ApiModelProperty({
    description: '',
    example: '',
})
readonly name: string;

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