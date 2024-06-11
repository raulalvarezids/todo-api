import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { UserTodo } from 'src/users/schemas/user.schema';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {

  @Prop({required:true})
  descripcion: string;

  @Prop({required:true,  type: mongoose.Schema.Types.ObjectId, ref: 'UserTodo'})
  userId: UserTodo;

  @Prop({required:true})
  status: boolean
}

export const TaskSchema = SchemaFactory.createForClass(Task);