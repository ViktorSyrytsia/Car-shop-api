import { prop, Ref, Typegoose } from 'typegoose';

import { Car } from './car.model';
import { ProductType } from './product-type.model';

export class Product extends Typegoose {
  @prop({ ref: () => Car, required: true })
  public car: Ref<Car>;

  @prop({ ref: () => ProductType, required: true })
  public type: Ref<ProductType>;

  @prop({ required: true })
  public name: string;

  @prop({ required: false, default: Date() })
  public createdAt?: Date;

  @prop({ required: false, default: Date() })
  public updatedAt?: Date;
}

export const productModel = new Product().getModelForClass(Product);
