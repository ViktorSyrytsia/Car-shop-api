import { prop, Typegoose, InstanceType } from 'typegoose';

export class ProductType extends Typegoose {
  @prop({ required: true })
  public name: string;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const productTypeModel = new ProductType().getModelForClass(ProductType);
export type DocumentProductType = InstanceType<ProductType>;
