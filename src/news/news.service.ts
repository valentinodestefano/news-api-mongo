import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

import { NewsInterface } from './interface/news.interface';
import { NewsDTO } from './dto/news.dto';
import { Cron, CronExpression } from '@nestjs/schedule';
@Injectable()
export class NewsService {

    constructor(@InjectModel('News') private readonly newsModel: Model<NewsInterface>,
    private httpService: HttpService){}

    @Cron(CronExpression.EVERY_HOUR)
    async getJson(){
        const news = await this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', {}).subscribe(
            res => {
                const json = res.data.hits;
                for(var i = 0; i < json.length; i++){
                    console.log(json[i])
                    this.PushNews(json[i]);
                }
            }
        )
        return news;
    }

    async PushNews(newsDTO: NewsDTO): Promise<NewsInterface>{
        const news = new this.newsModel(newsDTO);
        return await news.save();
    }

    async deleteNews(_id: string): Promise<NewsInterface>{
        const newsDeleted = await this.newsModel.findByIdAndDelete(_id);
        return newsDeleted;
    }

    async deleteAllNews(){
        await this.newsModel.deleteMany();
    }


    async getNews(): Promise<NewsInterface[]>{
        const news = await this.newsModel.find().limit(5);
        return news;
    }

    async getNewsByAuthor(author: string): Promise<NewsInterface[]>{
        const news = await this.newsModel.find({ author });
        return news;
    }

    async getNewsByTitle(title: string): Promise<NewsInterface[]>{
        const news = await this.newsModel.find({ title });
        return news;
    }
}
