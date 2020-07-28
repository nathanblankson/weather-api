// Nest dependencies
import { Injectable } from '@nestjs/common';

// Local files
import { UserEntity } from '../../core/entities/user.entity';
import { UserRepository } from '../../core/repositories/user.repository';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    /**
     * Find all users
     */
    public async findAll(): Promise<UserEntity[] | undefined> {
        return await this.userRepository.find();
    }

    /**
     * Find user by email
     * @param email email to search for
     */
    async findOneByEmail(email: string): Promise<UserEntity | undefined> {
        return this.userRepository.findOneByEmail(email);
    }
}
