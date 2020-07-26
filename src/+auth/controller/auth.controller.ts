// Nest dependencies
import { Controller, Post, UsePipes, ValidationPipe, Body } from '@nestjs/common';

// Local files
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('login')
    @UsePipes(ValidationPipe)
    login(@Body() credentials: any) {
        return this.authService.login(credentials);
    }
}
