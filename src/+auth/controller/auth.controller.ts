// Nest dependencies
import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';

// Local files
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../../+user/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() credentials: LoginDto) {
        return this.authService.login(credentials);
    }

    @Post('register')
    @UsePipes(ValidationPipe)
    register(@Body() data: CreateUserDto) {
        return this.authService.register(data);
    }
}
