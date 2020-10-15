import { InstanceType, prop, Typegoose } from 'typegoose';

export class User extends Typegoose {
  @prop({
    required: true, validate: {
      validator: (firstname) => { return firstname.length > 0 && firstname.length < 20; },
      message: 'Firstname must be greater than 0. but shorter than 20'
    }
  })
  public firstname: string;

  @prop({
    required: true, validate: {
      validator: (lastname) => { return lastname.length > 0 && lastname.length < 20; },
      message: 'Lastname must be greater than 0. but shorter than 20'
    }
  })
  public lastname: string;

  @prop({ required: true, unique: true, validate: /\S+@\S+\.\S+/ })
  public email: string;

  @prop({
    required: true, validate: {
      validator: (password) => { return password.length > 0 && password.length < 20; },
      message: 'Password must be greater than 0. but shorter than 20'
    }
  })
  public password: string;

  @prop({
    required: true, unique: true, validate: {
      validator: (phone) => { return phone.length === 12; },
      message: 'Phone lengt must be 12'
    }
  })
  public phone: number;

  @prop({ required: false, default: 'user', enum: ['user', 'admin'] })
  public role?: string;

  @prop({ required: false, default: Date.now() })
  public createdAt?: number;

  @prop({ required: false, default: Date.now() })
  public updatedAt?: number;
}

export const userModel = new User().getModelForClass(User);
export type DocumentUser = InstanceType<User>;
