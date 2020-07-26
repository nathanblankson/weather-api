// Nest dependencies
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Local files
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { configService } from '../config/config.service';

@Module({
    imports: [
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: configService.getAccessTokenSecret(),
                    signOptions: {
                        ...({ expiresIn: configService.getJwtExpirationTime() }),
                    },
                }
            },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule]
})
export class AuthModule { }
