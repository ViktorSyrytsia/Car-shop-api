import { Types } from 'mongoose';
import { prop, Typegoose, InstanceType } from 'typegoose';

import { Car } from './car.model';
import { ProductType } from './product-type.model';

export class Product extends Typegoose {
  @prop({ ref: () => Car, required: true })
  public car: Types.ObjectId;

  @prop({ ref: () => ProductType, required: true })
  public type: Types.ObjectId;

  @prop({ required: true })
  public name: string;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const productModel = new Product().getModelForClass(Product);
export type DocumentProduct = InstanceType<Product>;
