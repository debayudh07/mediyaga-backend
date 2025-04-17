// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DoctorsModule } from './doctor/doctor.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://debayudhbasu:yJ7xPqtT5DCqwrIM@cluster0.cnctpsi.mongodb.net/mediyaga?retryWrites=true&w=majority&appName=Cluster0', {
      connectionFactory: (connection) => {
        connection.on('connected', () => {
          console.log('MongoDB connection established successfully');
        });
        return connection;
      },
    }),
    AuthModule,
    UsersModule,
    DoctorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}