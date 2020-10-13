import { prop, Typegoose } from 'typegoose';

export class ProductType extends Typegoose {
  @prop({ required: true })
  public name: string;

  @prop({ required: false, default: Date() })
  public createdAt?: Date;

  @prop({ required: false, default: Date() })
  public updatedAt?: Date;
}

export const productTypeModel = new ProductType().getModelForClass(ProductType);
