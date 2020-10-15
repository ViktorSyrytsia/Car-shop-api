import { Types } from 'mongoose';
import { prop, Typegoose, InstanceType, Ref } from 'typegoose';

import { Car } from './car.model';
import { ProductType } from './product-type.model';
import { Provider } from './provider.model';

export class Product extends Typegoose {
  @prop({ ref: () => Car, required: true })
  public car: Ref<Car | Types.ObjectId>;

  @prop({ ref: () => Provider, required: true })
  public provider: Ref<Provider | Types.ObjectId>;

  @prop({ ref: () => ProductType, required: true })
  public type: Ref<ProductType | Types.ObjectId>;

  @prop({ required: true })
  public name: string;

  @prop({ required: true })
  public description: string;

  @prop({ required: false, default: 0 })
  public quantity: number;

  @prop({ required: true })
  public price: number;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const productModel = new Product().getModelForClass(Product);
export type DocumentProduct = InstanceType<Product>;
