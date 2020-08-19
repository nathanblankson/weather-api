// Nest dependencies
import { ApiProperty } from '@nestjs/swagger';

// Other dependencies
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}
