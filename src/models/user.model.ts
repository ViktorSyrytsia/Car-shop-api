import { prop, Typegoose } from 'typegoose';

export class User extends Typegoose {
    @prop({ required: true })
    public firstname: string;

    @prop({ required: true })
    public lastname: string;

    @prop({ required: true })
    public email: string;

    @prop({ required: true })
    public password: string;

    @prop({ required: true })
    public phone: number

    @prop({ required: false, default: 'user' })
    public role?: string

    @prop({ required: false, default: Date() })
    public createdAt?: Date;

    @prop({ required: false, default: Date() })
    public updatedAt?: Date;
}

export const userModel = new User().getModelForClass(User);
