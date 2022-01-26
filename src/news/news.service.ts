import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';

import { NewsInterface } from './interface/news.interface';

@Injectable()
export class NewsService {

    constructor(@InjectModel('News') private readonly newsModel: Model<NewsInterface>,
    private httpService: HttpService){}

    async getJson(){
        const news = await this.httpService.get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs', {}).subscribe(
            res => {
                console.log(res.data);
            }
        )
        //const news = await this.newsModel.find().populate('news');
        return news;
    }
}
