// Nest dependencies
import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

// Local files
import { AuthService } from '../service/auth.service';
import { CreateUserDto } from '../../+user/dto/create-user.dto';
import { LoginDto } from '../dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @ApiOkResponse({ description: 'User Login' })
    @ApiUnauthorizedResponse({ description: 'Invalid credentials' })
    @UsePipes(ValidationPipe)
    login(@Body() credentials: LoginDto) {
        return this.authService.login(credentials);
    }

    @Post('register')
    @ApiCreatedResponse({ description: 'User Registration' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    @UsePipes(ValidationPipe)
    register(@Body() data: CreateUserDto) {
        return this.authService.register(data);
    }
}
