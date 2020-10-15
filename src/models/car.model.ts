import { prop, Typegoose, InstanceType } from 'typegoose';

export class Car extends Typegoose {
  @prop({
    required: true, validate: {
      validator: (brand) => { return brand.length > 0 && brand.length < 20; },
      message: 'Brand must be greater than 0. but shorter than 20'
    }
  })
  public brand: string;

  @prop({
    required: true, validate: {
      validator: (model) => { return model.length > 0 && model.length < 20; },
      message: 'Model must be greater than 0. but shorter than 20'
    }
  })
  public model: string;

  @prop({
    required: true, validate: {
      validator: (year) => { return year.length === 4; },
      message: 'Year length must be equal 4'
    }
  })
  public year: string;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const carModel = new Car().getModelForClass(Car);
export type DocumentCar = InstanceType<Car>;
