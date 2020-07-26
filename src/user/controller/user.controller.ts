// Nest dependencies
import { Controller, Get } from '@nestjs/common';

// Local files
import { UserService } from '../service/user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Get()
    public async getAll() {
        return await this.userService.getAll();
    }
}
