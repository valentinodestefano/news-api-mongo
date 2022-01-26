import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose';

@Schema()
export class News{

    @Prop()
    created_at: Date;

    @Prop()
    title: string;

    @Prop()
    url: string;

    @Prop()
    author: string;

    @Prop()
    points: string;

    @Prop()
    story_text: string;

    @Prop()
    comment_text: string;

    @Prop()
    num_comments: string;

    @Prop()
    story_id: number;

    @Prop()
    story_title: string;

    @Prop()
    story_url: string;

    @Prop()
    parent_id: number;

    @Prop()
    created_at_i: number;


}

export const NewsSchema = SchemaFactory.createForClass(News);