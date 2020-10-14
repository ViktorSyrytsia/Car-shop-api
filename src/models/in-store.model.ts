import { Types } from 'mongoose';
import { prop, Ref, Typegoose, InstanceType } from 'typegoose';

import { Product } from './product.model';

class InStore extends Typegoose {
  @prop({ ref: () => Product, required: true })
  public product: Ref<Product | Types.ObjectId>;

  @prop({ required: true })
  public price: number;

  @prop({ required: true })
  public quantity: number;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const inStoreModel = new InStore().getModelForClass(InStore);
export type DocumentInStore = InstanceType<InStore>;
