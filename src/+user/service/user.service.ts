// Nest dependencies
import { Injectable } from '@nestjs/common';

// Local files
import { UserEntity } from '../../core/entities/user.entity';
import { UserRepository } from '../../core/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    public async findAll(): Promise<UserEntity[] | undefined> {
        return await this.userRepository.find();
    }

    async findOne(email: string): Promise<UserEntity | undefined> {
        return this.userRepository.getUserByEmail(email);
    }
}
