import { Injectable } from '@nestjs/common';
import { UserInterface } from './interface/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDTO } from './dto/user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<UserInterface>){

    }

    async register(userDTO: UserDTO): Promise<UserInterface>{
        const newUser = new this.userModel(userDTO);
        return await newUser.save();
    }


}
