// Nest dependencies
import { ApiPropertyOptional } from '@nestjs/swagger';

// Other dependencies
import { IsEmail, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {

    @ApiPropertyOptional()
    @IsOptional()
    @Length(1)
    readonly firstName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Length(1)
    readonly lastName: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsEmail()
    readonly email: string;

    @ApiPropertyOptional()
    @IsOptional()
    @Length(6)
    readonly currentPassword: string;

    @ApiPropertyOptional({ minLength: 6 })
    @IsOptional()
    @Length(6)
    readonly newPassword: string;
}
