// Nest dependencies
import { BadRequestException } from "@nestjs/common";

// Other dependencies
import { EntityRepository, Repository } from "typeorm";

// Local files
import { UserEntity } from '../entities/user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {

    async getUserByEmail(email: string): Promise<UserEntity> {
        try {
            return await this.findOneOrFail({ email });
        } catch (err) {
            throw new BadRequestException('User could not found by given email.');
        }
    }
}
