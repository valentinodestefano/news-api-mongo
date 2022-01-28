import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';

@Module({
    imports: [HttpModule, MongooseModule.forFeature([
      {name: 'User', schema: UserSchema}
    ])],
    controllers: [UserController],
    providers: [UserService]
  })
export class UserModule {}
