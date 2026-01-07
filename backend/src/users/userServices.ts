import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './userSchema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) { }

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  create(userData: Partial<User>) {
    return this.userModel.create(userData);
  }

  async verifyUser(token: string) {
    const user = await this.userModel.findOne({ verificationToken: token });
    if (!user) return null;

    return this.userModel.findOneAndUpdate(
      { verificationToken: token },
      { isVerified: true, verificationToken: null },
      { new: true }
    );
  }
}
