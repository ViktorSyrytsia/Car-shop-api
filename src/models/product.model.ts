import { Types } from 'mongoose';
import { prop, Typegoose, InstanceType, Ref } from 'typegoose';

import { Car } from './car.model';
import { ProductType } from './product-type.model';

export class Product extends Typegoose {
  @prop({ ref: () => Car, required: true })
  car: Ref<Car | Types.ObjectId>;

  @prop({ ref: () => ProductType, required: true })
  type: Ref<ProductType | Types.ObjectId>;

  @prop({ required: true })
  public name: string;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const productModel = new Product().getModelForClass(Product);
export type DocumentProduct = InstanceType<Product>;
