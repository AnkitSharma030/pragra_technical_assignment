import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
    constructor(private configService: ConfigService) {
        super({
            clientID: configService.get<string>('FACEBOOK_APP_ID') || 'dummy_id',
            clientSecret: configService.get<string>('FACEBOOK_APP_SECRET') || 'dummy_secret',
            callbackURL: `${process.env.BACKEND_URL}/auth/facebook/callback`,
            scope: 'email',
            profileFields: ['emails', 'name'],
        });
    }

    async validate(
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: (err: any, result: any, info?: any) => void,
    ): Promise<any> {
        const { name, emails } = profile;
        const user = {
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            facebookId: profile.id,
        };
        done(null, user);
    }
}
