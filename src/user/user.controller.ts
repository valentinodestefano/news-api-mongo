import { Body, Controller, Post, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';
import { LoginUserDTO } from './dto/loginUser.dto';

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

    @ApiTags('User')
    @Post('login')
    async login(@Res() res, @Body() loginUserDTO: LoginUserDTO){
        loginUserDTO.email = loginUserDTO.email.toLowerCase();
        const email = loginUserDTO.email;
        const user = await this.userService.loginFindOne({email});
        if(!user){
            throw new BadRequestException('invalid credentials');
        }
        if(!await bcrypt.compare(loginUserDTO.password, user.password)){
            throw new BadRequestException('invalid credentials');
        }

        return res.status(HttpStatus.OK).json({
            message: 'login succesful',
            user: user
        });
    }

}
