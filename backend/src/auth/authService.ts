import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/users/userServices';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async signup(name: string, email: string, password: string) {
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await this.usersService.create({
      name,
      email,
      password: hashedPassword,
      verificationToken,
    });

    // send verification email
    await this.sendVerificationEmail(email, verificationToken);

    return { message: 'Signup successful. Please verify your email.' };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!user.isVerified) {
      throw new BadRequestException('Please verify your email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email });

    return { accessToken: token, user };
  }

  async verifyEmail(token: string) {
    const user = await this.usersService.verifyUser(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired token');
    }

    return { message: 'Email verified successfully' };
  }

  async sendVerificationEmail(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const verificationUrl = `http://localhost:3000/auth/verify?token=${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your email',
      html: `<p>Click to verify your email:</p>
             <a href="${verificationUrl}">${verificationUrl}</a>`,
    });
  }
  async validateOAuthUser(profile: any) {
    const { email, firstName, lastName, googleId, facebookId } = profile;
    const name = `${firstName} ${lastName}`;

    let user = await this.usersService.findByEmail(email);

    if (user) {
      // Update existing user with provider ID if missing (optional but good for linking)
      if (googleId && !user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
      if (facebookId && !user.facebookId) {
        user.facebookId = facebookId;
        await user.save();
      }
    } else {
      user = await this.usersService.create({
        email,
        name,
        isVerified: true, // Trusted provider
        googleId,
        facebookId,
        // password: crypto.randomBytes(16).toString('hex') // Optional: random password
      });
    }

    const token = this.jwtService.sign({ id: user._id, email: user.email });
    return { accessToken: token, user };
  }
}
