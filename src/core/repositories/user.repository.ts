// Nest dependencies
import { BadRequestException } from "@nestjs/common";

// Other dependencies
import { EntityRepository, Repository } from "typeorm";
import * as bcrypt from 'bcryptjs';

// Local files
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from "../../+user/dto/create-user.dto";
import { UpdateUserDto } from "../../+user/dto/update-user.dto";

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    /**
     * Create a new user
     * @param userData user attributes in request body
     */
    async createUser(userData: CreateUserDto): Promise<UserEntity> {
        if (await this.findOneByEmail(userData.email)) {
            throw new BadRequestException('This email already exists.', 'email_already_exists');
        }

        const user = new UserEntity();
        user.email = userData.email;
        user.password = userData.password;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;

        try {
            return await this.save(user);
        } catch (err) {
            throw new BadRequestException(err);
        }
    }

    /**
     * Find user by id
     * @param id id to search for
     */
    async findOneById(id: string | number): Promise<UserEntity> {
        try {
            return await this.findOneOrFail(id);
        } catch (err) {
            throw new BadRequestException('User could not found by given id.');
        }
    }

    /**
     * Find user by email
     * @param email email to search for
     */
    async findOneByEmail(email: string): Promise<UserEntity> {
        try {
            return await this.findOneOrFail({ email });
        } catch (err) {
            throw new BadRequestException('User could not found by given email.');
        }
    }

    /**
     * Update a  user
     * @param id id of user
     * @param userData user attributes in request body
     */
    async updateUser(id: string | number, userData: Partial<UpdateUserDto>): Promise<UserEntity> {
        let userToUpdate: UserEntity;

        try {
            userToUpdate = await this.findOneById(id);
        } catch (err) {
            throw new BadRequestException('User could not found by given id.');
        }

        // check if email already exists in db
        if (userData.email && await this.findOneByEmail(userData.email)) {
            throw new BadRequestException('This email already exists.', 'email_already_exists');
        }

        // if request body includes currentPassword & newPassword
        if (userData.currentPassword && userData.newPassword) {
            const isOldPasswordCorrect = await bcrypt.compare(userData.currentPassword, userToUpdate.password);
            // if user provied wrong old password
            if (!isOldPasswordCorrect) {
                throw new BadRequestException('Your current password is incorrect.', 'current_password_incorrect');
            } else {
                // user provied correct old password
                userToUpdate.password = await bcrypt.hash(userData.newPassword, 10);
            }
        } else if ((userData.currentPassword && !userData.newPassword) || (!userData.currentPassword && userData.newPassword)) {
            throw new BadRequestException('Please provide both your current & new passwords or leave them empty if you want to update your profile without your changing password.');
        }

        const updated = Object.assign(userToUpdate, userData);
        return await this.save(updated);
    }

    /**
     * Delete a new user
     * @param id id of user
     */
    async deleteUser(id: string | number): Promise<any> {
        try {
            const user = await this.findOneById(id);
            return await this.delete(user.id);
        } catch (err) {
            throw new BadRequestException('User could not found by given id.');
        }
    }
}
