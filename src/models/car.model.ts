import { prop, Typegoose, InstanceType } from 'typegoose';

export class Car extends Typegoose {
  @prop({ required: true })
  public brand: string;

  @prop({ required: true })
  public model: string;

  @prop({ required: true })
  public year: string;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const carModel = new Car().getModelForClass(Car);
export type DocumentCar = InstanceType<Car>;
