import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Res } from '@nestjs/common';

import { NewsService } from './news.service';


import { ApiTags } from '@nestjs/swagger';
import { NewsDTO } from './dto/news.dto';

@Controller('news')
export class NewsController {

    constructor(private newsService: NewsService){}

    @ApiTags('News')
    @Get('/createAutor')
    async createPost(@Res() res){
        const news = await this.newsService.getJson();
        return res.status(HttpStatus.OK).json({
            message: 'created',
            news: news
        });
    }
}
