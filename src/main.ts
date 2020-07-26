// Nest dependencies
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// Local files
import { AppModule } from './app.module';
import { configService } from './config/config.service';

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
    })

    await app.listen(3000);
}
bootstrap();
