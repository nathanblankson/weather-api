// Nest dependencies
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

// Other dependencies
import { Repository } from 'typeorm';

// Local files
import { UserEntity } from '../../models/user.entity';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) { }

    public async getAll() {
        return await this.userRepository.find();
    }
}
