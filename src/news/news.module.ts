import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsSchema } from './schema/news.schema';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule, MongooseModule.forFeature([
      {name: 'News', schema: NewsSchema}
    ])],
    controllers: [NewsController],
    providers: [NewsService]
  })
export class NewsModule {}
