import { InstanceType, prop, Typegoose } from 'typegoose';

export class Provider extends Typegoose {
  @prop({
    required: true, unique: true, validate: {
      validator: (name) => { return name.length > 0 && name.length < 200; },
      message: 'Name must be greater than 0. but shorter than 20'
    }
  })
  public name: string;

  @prop({
    required: true, validate: {
      validator: (address) => { return address.length > 0 && address.length < 200; },
      message: 'Address must be greater than 0. but shorter than 20'
    }
  })
  public address: string;

  @prop({
    required: true, unique: true, validate: {
      validator: (phone) => { return phone.length === 12; },
      message: 'Phone lengt must be 12'
    }
  })
  public phone: number;

  @prop({ required: false, default: Date.now() })
  public createdAt?: Date;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const providerModel = new Provider().getModelForClass(Provider);
export type DocumentProvider = InstanceType<Provider>;
