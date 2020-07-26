// Nest dependencies
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Local files
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configService } from './config/config.service';

@Module({
    imports: [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig())
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
