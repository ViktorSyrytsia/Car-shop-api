import { prop, Ref, Typegoose } from 'typegoose';

import { Product } from './product.model';
import { User } from './user.model';

export class Order extends Typegoose {
  @prop({ ref: () => Product, required: true })
  public products: Ref<Product>[];

  @prop({ required: false, default: 0 })
  public summary?: number;

  @prop({ ref: () => User, required: true })
  public customer: Ref<User>;

  @prop({ required: false, default: Date() })
  public createdAt?: Date;

  @prop({ required: false, default: Date() })
  public updatedAt?: Date;
}

export const orderModel = new Order().getModelForClass(Order);
