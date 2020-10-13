import { prop, Typegoose } from 'typegoose';

export class Provider extends Typegoose {
  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public address: string;

  @prop({ required: true })
  public phone: number;

  @prop({ required: false, default: Date() })
  public createdAt?: Date;

  @prop({ required: false, default: Date() })
  public updatedAt?: Date;
}

export const providerModel = new Provider().getModelForClass(Provider);
