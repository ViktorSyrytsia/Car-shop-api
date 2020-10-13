import { prop, Typegoose } from 'typegoose';

export class Car extends Typegoose {
  @prop({ required: true })
  public brand: string;

  @prop({ required: true })
  public model: string;

  @prop({ required: true })
  public year: string;

  @prop({ required: false, default: Date() })
  public createdAt?: Date;

  @prop({ required: false, default: Date() })
  public updatedAt?: Date;
}

export const carModel = new Car().getModelForClass(Car);
