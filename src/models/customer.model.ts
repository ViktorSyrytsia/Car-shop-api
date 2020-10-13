import { prop, Typegoose } from 'typegoose';

class Customer extends Typegoose {
  @prop({ required: true })
    public firstname: string;

  @prop({ required: true })
    public lastname: string;

  @prop({ required: true })
    public email: string;

  @prop({ required: true })
    public password: string;

  @prop({ required: false, default: Date() })
    public createdAt?: Date;

  @prop({ required: false, default: Date() })
    public updatedAt?: Date;
}

export default new Customer().getModelForClass(Customer);
