// Nest dependencies
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

// Other dependencies
import { ExtractJwt, Strategy } from 'passport-jwt';

// Local files
import { UserRepository } from '../../core/repositories/user.repository';
import { UserEntity } from '../../core/entities/user.entity';
import { configService } from '../../config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.getAccessTokenSecret(),
        });
    }

    async validate({ iat, exp, email }): Promise<any> {
        const timeDiff = exp - iat

        if (timeDiff <= 0) {
            throw new UnauthorizedException();
        }

        let user: UserEntity;
        try {
            user = await this.userRepository.getUserByEmail(email);
        } catch (error) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
