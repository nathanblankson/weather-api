// Nest dependencies
import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';

// Local files
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    public async create(@Body() userData: CreateUserDto) {
        return await this.userService.createUser(userData);
    }

    @Get()
    public async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    public async findOne(@Param('id') id) {
        return await this.userService.findOneById(id);
    }

    @Patch(':id')
    public async update(@Param('id') id, @Body() userData: Partial<UpdateUserDto>) {
        return await this.userService.updateUser(id, userData);
    }

    @Delete(':id')
    public async delete(@Param('id') id) {
        return await this.userService.deleteUser(id);
    }
}
