import { prop, Ref, Typegoose } from 'typegoose';
import { Product } from './product.model';
import { Provider } from './provider.model';

export class Store extends Typegoose {
  @prop({ required: true })
  public productInStore: ProductInStore;

  @prop({ required: false, default: Date() })
  public createdAt?: Date;

  @prop({ required: false, default: Date() })
  public updatedAt?: Date;
}

class ProductInStore extends Typegoose {
  @prop({ ref: () => Product, required: true })
  public product: Ref<Product>;

  @prop({ ref: () => Provider, required: true })
  public provider: Ref<Provider>

  @prop({ required: true })
  public price: number;

  @prop({ required: true })
  public quantity: number;
}


export const storeModel = new Store().getModelForClass(Store);
