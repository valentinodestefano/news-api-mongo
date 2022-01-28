import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Post, Put, Query, Res } from '@nestjs/common';

import { NewsService } from './news.service';


import { ApiTags } from '@nestjs/swagger';
import { NewsDTO } from './dto/news.dto';



@Controller('news')
export class NewsController {

    constructor(private newsService: NewsService){}

    @ApiTags('News')
    @Post('/uploadNews')
    async createPost(@Res() res){
        const news = await this.newsService.getJson();
        return res.status(HttpStatus.OK).json({
            message: 'News items have been obtained and successfully uploaded to the database.',
        });
    }

    @ApiTags('News')
    @Delete('/deleteNews/:_id')
    async deleteNews(@Res() res, @Param('_id') _id: string){
        const news = await this.newsService.deleteNews(_id);
        return res.status(HttpStatus.OK).json({
            message: 'succesful'
        })
    }

    @ApiTags('News')
    @Delete('/deleteAllNews')
    async deleteAllNews(@Res() res){
        const news = await this.newsService.deleteAllNews();
        return res.status(HttpStatus.OK).json({
            message: 'succesful'
        })
    }

    @ApiTags('News')
    @Get('/getNews')
    async getNews(@Res() res){
        const news = await this.newsService.getNews();
        return res.status(HttpStatus.OK).json({
            message: 'Succesful',
            news: news
        })
    }

    @ApiTags('News')
    @Get('/:title')
    async getTitle(@Res() res, @Param('title') title: string){
        const news = await this.newsService.getNewsByTitle(title);
        return res.status(HttpStatus.OK).json({
            message: 'Succesful',
            news: news
        })
    }

    @ApiTags('News')
    @Get('/:author')
    async getNewsByAuthor(@Res() res, @Param('author') author: string){
        const news = await this.newsService.getNewsByAuthor(author);
        if (!news) {
           return res.status(HttpStatus.BAD_REQUEST);
        }
        return res.status(HttpStatus.OK).json({
            message: 'succesful',
            news: news
        })
    }


}
