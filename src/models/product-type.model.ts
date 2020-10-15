import { prop, Typegoose, InstanceType } from 'typegoose';

export class ProductType extends Typegoose {
  @prop({
    required: true, validate: {
      validator: (name) => { return name.length > 0 && name.length < 20; },
      message: 'Name must be greater than 0. but shorter than 20'
    }
  })
  public name: string;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const productTypeModel = new ProductType().getModelForClass(ProductType);
export type DocumentProductType = InstanceType<ProductType>;
