// Nest dependencies
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Local files
import { AppModule } from './app.module';
import { configService } from './config/config.service';

const PORT = configService.getPort() || 4000;

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Generate Swagger doc if not production
    if (!configService.isProduction()) {
        const document = SwaggerModule.createDocument(app, new DocumentBuilder()
            .setTitle('Weather API')
            .setDescription('My Weather API')
            .build());
        SwaggerModule.setup('api/docs', app, document);
    }

    app.setGlobalPrefix('/api');
    app.enableCors({
        origin: [
            'http://localhost:4200' // angular
        ]
    });

    Logger.log(`Running on localhost:${PORT}`, 'Bootstrap');
    await app.listen(PORT);
}
bootstrap();
