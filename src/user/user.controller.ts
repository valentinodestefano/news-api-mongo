import { Body, Controller, Post, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService){}

    @ApiTags('User')
    @Post('register')
    async register(@Res() res, @Body() userDTO: UserDTO) {
        userDTO.password = await bcrypt.hash(userDTO.password, 12);
        userDTO.email = userDTO.email.toLowerCase();
        const newUser = await this.userService.register(userDTO);
        return res.status(HttpStatus.OK).json({
            message: 'created',
            user: newUser
        });
    }

}
