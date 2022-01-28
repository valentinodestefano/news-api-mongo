import { Document } from "mongoose";

export interface UserInterface extends Document {

    readonly _id: number;
    readonly name: string;
    readonly email: string;
    readonly password: string;

}