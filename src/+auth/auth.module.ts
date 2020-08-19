// Nest dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Local files
import { AuthController } from './controller/auth.controller';
import { AuthService } from './service/auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { configService } from '../config/config.service';
import { UserModule } from '../+user/user.module';
import { UserEntity } from '../core/entities/user.entity';
import { UserRepository } from '../core/repositories/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, UserRepository]),
        UserModule,
        PassportModule.register({
            defaultStrategy: 'jwt'
        }),
        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: configService.getJwtSecret(),
                    signOptions: {
                        ...({ expiresIn: configService.getJwtExpiresIn() }),
                    },
                }
            },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [PassportModule]
})
export class AuthModule { }
