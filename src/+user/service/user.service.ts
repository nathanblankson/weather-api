// Nest dependencies
import { Injectable } from '@nestjs/common';

// Local files
import { UserEntity } from '../../core/entities/user.entity';
import { UserRepository } from '../../core/repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    /**
     * Create a new user
     * @param userData user attributes in request body
     */
    async createUser(userData: CreateUserDto): Promise<UserEntity | undefined> {
        return this.userRepository.createUser(userData);
    }

    /**
     * Find all users
     */
    public async findAll(): Promise<UserEntity[] | undefined> {
        return await this.userRepository.find();
    }

    /**
     * Find user by id
     * @param id id to search for
     */
    async findOne(id: string | number): Promise<UserEntity | undefined> {
        return this.userRepository.findOneById(id);
    }

    /**
     * Update a user
     * @param userData user attributes in request body
     */
    async updateUser(id: string | number, userData: Partial<UpdateUserDto>): Promise<UserEntity | undefined> {
        return this.userRepository.updateUser(id, userData);
    }

    /**
     * Delete a user
     * @param userData user attributes in request body
     */
    async deleteUser(id: string | number): Promise<any> {
        return this.userRepository.deleteUser(id);
    }
}
