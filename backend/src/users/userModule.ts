import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './userSchema';
import { UsersService } from './userServices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ]),
  ],
  providers: [UsersService],
  exports: [UsersService], // 👈 VERY IMPORTANT
})
export class UsersModule { }
