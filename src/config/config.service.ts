// Nest dependencies
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// Local files
require('dotenv').config();

class ConfigService {

    constructor(private env: { [k: string]: string | undefined }) { }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value;
    }

    public ensureValues(keys: string[]) {
        keys.forEach(k => this.getValue(k, true));
        return this;
    }

    public getPort() {
        return this.getValue('PORT', true);
    }

    public isProduction() {
        const mode = this.getValue('MODE', false);
        return mode != 'DEV';
    }

    public getJwtSecret() {
        return this.getValue('JWT_SECRET', true);
    }

    public getJwtExpiresIn() {
        return this.getValue('JWT_EXPIRES_IN', true);
    }

    public getMapquestKey() {
        return this.getValue('MAPQUEST_KEY', true);
    }

    public getMapquestUrl() {
        return this.getValue('MAPQUEST_URL', true);
    }

    public getOpenWeatherMapKey() {
        return this.getValue('OPENWEATHERMAP_KEY', true);
    }

    public getOpenWeatherMapUrl() {
        return this.getValue('OPENWEATHERMAP_URL', true);
    }

    public getTypeOrmConfig(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            host: this.getValue('POSTGRES_HOST'),
            port: parseInt(this.getValue('POSTGRES_PORT')),
            username: this.getValue('POSTGRES_USER'),
            password: this.getValue('POSTGRES_PASSWORD'),
            database: this.getValue('POSTGRES_DATABASE'),
            entities: ['dist/**/*.entity.js'],
            migrationsTableName: 'migrations',
            migrations: ['dist/migrations/*.js'],
            cli: {
                migrationsDir: 'src/migrations',
            },
            ssl: this.isProduction(),
        };
    }
}

const configService = new ConfigService(process.env)
    .ensureValues([
        'POSTGRES_HOST',
        'POSTGRES_PORT',
        'POSTGRES_USER',
        'POSTGRES_PASSWORD',
        'POSTGRES_DATABASE'
    ]);

export { configService };
