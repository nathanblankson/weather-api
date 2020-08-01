// Nest dependencies
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Local files
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from '../../+user/service/user.service';
import { LoginDto } from '../dto/login.dto';
import { CreateUserDto } from '../../+user/dto/create-user.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    /**
     * Log in a user
     * @param data the attributes in request body
     */
    async login(data: LoginDto) {
        const user = await this.userService.findOneByEmail(data.email);
        if (!user || !await user.comparePassword(data.password)) {
            throw new UnauthorizedException('Invalid email/password combination.', 'invalid_credentials');
        }
        const payload = { id: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { user: user.toJSON(), token };
    }

    /**
     * Register a user
     * @param data the attributes in request body
     */
    async register(data: CreateUserDto) {
        const user = await this.userService.createUser(data);
        const payload = { id: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        return { user: user.toJSON(), token };
    }

    /**
     * Validates a user using JWT token payload.
     * @param payload JWT token payload.
     */
    async validateUser(payload: JwtPayload): Promise<any> {
        return await this.userService.findOneById(payload.id);
    }
}
