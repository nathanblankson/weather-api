// Nest dependencies
import { BadRequestException } from "@nestjs/common";

// Other dependencies
import { EntityRepository, Repository } from "typeorm";

// Local files
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

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
}
