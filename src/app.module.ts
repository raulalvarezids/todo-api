import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UsersModule,    
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.URLMONGO),
    TasksModule,
    JwtModule.register({
      global: true,      
    }),
  ],
  controllers: [],  
  
})


export class AppModule {}
