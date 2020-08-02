// Other dependencies
import { Entity, Column, BeforeInsert, OneToMany } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';

// Local files
import { AbstractEntity } from "./abstract.entity";
import { UserPreferenceEntity } from "./user-preference.entity";

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
    @Column({ unique: true })
    @IsEmail()
    email: string;

    @Column()
    @Exclude()
    password: string;

    @Column({ name: 'first_name' })
    firstName: string;

    @Column({ name: 'last_name' })
    lastName: string;

    @OneToMany(type => UserPreferenceEntity, userPreference => userPreference.user)
    userPreference: UserPreferenceEntity;

    constructor(partial: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string) {
        return await bcrypt.compare(attempt, this.password);
    }
}
