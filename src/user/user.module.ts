import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [HttpModule, MongooseModule.forFeature([
      {name: 'User', schema: UserSchema}
    ]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'}
    })],
    controllers: [UserController],
    providers: [UserService]
  })
export class UserModule {}
