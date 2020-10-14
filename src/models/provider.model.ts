import { InstanceType, prop, Typegoose } from 'typegoose';

export class Provider extends Typegoose {
  @prop({ required: true, unique: true })
  public name: string;

  @prop({ required: true })
  public address: string;

  @prop({ required: true, unique: true })
  public phone: number;

  @prop({ required: false, default: Date.now() })
  public createdAt?: Date;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const providerModel = new Provider().getModelForClass(Provider);
export type DocumentProvider = InstanceType<Provider>;
