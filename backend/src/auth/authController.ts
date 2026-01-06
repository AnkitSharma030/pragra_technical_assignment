import { Controller, Post, Body, Get, Query, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './authService';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('signup')
  signup(@Body() body: SignupDto) {
    console.log('Signup Request Body:', body);
    return this.authService.signup(body.name, body.email, body.password);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    console.log('Login Request Body:', body);
    return this.authService.login(body.email, body.password);
  }

  @Get('verify')
  verifyEmail(@Query('token') token: string) {
    return this.authService.verifyEmail(token);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res) {
    const { accessToken, user } = await this.authService.validateOAuthUser(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${accessToken}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth(@Req() req) { }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Req() req, @Res() res) {
    const { accessToken, user } = await this.authService.validateOAuthUser(req.user);
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${accessToken}&user=${encodeURIComponent(JSON.stringify(user))}`);
  }
}
