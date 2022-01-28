import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';


@Module({
  imports: [NewsModule, MongooseModule.forRoot('mongodb+srv://valendesdel:Valentina_25@cluster0.8uvul.mongodb.net/test-reign?retryWrites=true&w=majority', 
  {useNewUrlParser: true}), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
