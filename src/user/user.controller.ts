import { Body, Controller, Post, Res, HttpStatus, BadRequestException, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

import * as bcrypt from 'bcrypt';
import { UserDTO } from './dto/user.dto';
import { LoginUserDTO } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, response } from 'express';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private jwtService: JwtService
        ){}

    @ApiTags('User')
    @Post('register')
    async register(@Res() res, @Body() userDTO: UserDTO) {
        userDTO.password = await bcrypt.hash(userDTO.password, 12);
        userDTO.email = userDTO.email.toLowerCase();
        const newUser = await this.userService.register(userDTO);
        const {password, ...result} = newUser;
        return res.status(HttpStatus.OK).json({
            message: 'created',
            user: newUser
        });
    }

    @ApiTags('User')
    @Post('login')
    async login(@Res({passthrough: true}) response: Response, @Body() loginUserDTO: LoginUserDTO){
        loginUserDTO.email = loginUserDTO.email.toLowerCase();
        const email = loginUserDTO.email;
        const user = await this.userService.loginFindOne({email});

        if(!user){
            throw new BadRequestException('invalid credentials');
        }
        if(!await bcrypt.compare(loginUserDTO.password, user.password)){
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user.id});

        response.cookie('jwt', jwt, {httpOnly: true});

        return jwt;
    }

    @ApiTags('User')
    @Post('authenticatedUser')
    async user(@Req() request: Request){
        try {
            const cookie = request.cookies['jwt'];
            const data = await this.jwtService.verifyAsync(cookie);

            if (!data) {
                throw new UnauthorizedException();
            }

            const user = await this.userService.loginFindOne({id: data['id']});

            const {password, ...result} = user;

            return user;

        } catch (e){
            throw new UnauthorizedException();
        }
    }

    @ApiTags('User')
    @Post('logout')
    async logout(@Res({passthrough: true}) response: Response){
        response.clearCookie('jwt');

        return {
            message: 'success logout'
        }
    }

}
