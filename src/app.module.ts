import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [NewsModule, MongooseModule.forRoot('mongodb+srv://valendesdel:Valentina_25@cluster0.hqhas.mongodb.net/test-reign?retryWrites=true&w=majority', 
  {useNewUrlParser: true})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
