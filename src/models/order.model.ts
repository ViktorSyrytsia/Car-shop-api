import { Types } from 'mongoose';
import { prop, Typegoose, InstanceType, Ref } from 'typegoose';

import { Product } from './product.model';
import { User } from './user.model';

export class Order extends Typegoose {
  @prop({ required: true })
  public products: Product[];

  @prop({ ref: () => User, required: true })
  public customer: Ref<User | Types.ObjectId>;

  @prop({ required: false, default: 'new' })
  public status: string;

  @prop({ required: true })
  public summary: number;

  @prop({ required: false })
  public comment?: string;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;

}

export const orderModel = new Order().getModelForClass(Order);
export type DocumentOrder = InstanceType<Order>;
