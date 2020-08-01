// Nest dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Local files
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';
import { UserModule } from './+user/user.module';
import { AuthModule } from './+auth/auth.module';
import { ForecastModule } from './+forecast/forecast.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        UserModule,
        AuthModule,
        ForecastModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
