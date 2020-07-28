// Nest dependencies
import { Injectable } from '@nestjs/common';

// Local files
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../../+user/service/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
    ) { }

    async login(data: any) {

    }

    /**
     * Validates a user using JWT token payload.
     * @param payload JWT token payload.
     */
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findOneByEmail(payload.email);
    }
}
