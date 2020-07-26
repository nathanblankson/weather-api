// Nest dependencies
import { Injectable } from '@nestjs/common';

// Local files
import { UserRepository } from '../../core/repositories/user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
    ) { }

    async login(data: any) {

    }
}
