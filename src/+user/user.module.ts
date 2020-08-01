// Nest dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Local files
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserEntity } from '../core/entities/user.entity';
import { UserRepository } from '../core/repositories/user.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, UserRepository])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
