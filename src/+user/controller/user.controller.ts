// Nest dependencies
import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse, ApiAcceptedResponse } from '@nestjs/swagger';

// Local files
import { UserService } from '../service/user.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) { }

    @Post()
    @ApiCreatedResponse({ description: 'User Created' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    public async create(@Body() userData: CreateUserDto) {
        return await this.userService.createUser(userData);
    }

    @Get()
    @ApiOkResponse({ description: 'Users Found' })
    public async findAll() {
        return await this.userService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({ description: 'User Found' })
    @ApiBadRequestResponse({ description: 'User ID not recognised' })
    public async findOne(@Param('id') id) {
        return await this.userService.findOneById(id);
    }

    @Patch(':id')
    @ApiOkResponse({ description: 'User Updated' })
    @ApiBadRequestResponse({ description: 'Bad Request' })
    public async update(@Param('id') id, @Body() userData: Partial<UpdateUserDto>) {
        return await this.userService.updateUser(id, userData);
    }

    @Delete(':id')
    @ApiOkResponse({ description: 'User Deleted' })
    @ApiBadRequestResponse({ description: 'User ID not recognised' })
    public async delete(@Param('id') id) {
        return await this.userService.deleteUser(id);
    }
}
