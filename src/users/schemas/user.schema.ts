import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<UserTodo>;

@Schema()
export class UserTodo {

  @Prop({required:true})
  email: string;

  @Prop({required:true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserTodo);