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

  @prop({
    required: true, validate: {
      validator: (name) => { return name.length > 0 && name.length < 20; },
      message: 'Name must be greater than 0. but shorter than 20'
    }
  })
  public name: string;

  @prop({
    required: true, validate: {
      validator: (description) => { return description.length > 0 && description.length < 200; },
      message: 'Description must be greater than 0. but shorter than 20'
    }
  })
  public description: string;

  @prop({
    required: false, default: 0, validate: {
      validator: (quantity) => { return quantity > 0; },
      message: 'Quantity must be greater than 0'
    }
  })
  public quantity: number;

  @prop({
    required: true, validate: {
      validator: (price) => { return price > 0; },
      message: 'Price must be greater than 0'
    }
  })
  public price: number;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const productModel = new Product().getModelForClass(Product);
export type DocumentProduct = InstanceType<Product>;
