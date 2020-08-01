// Nest dependencies
import { Module, HttpModule } from '@nestjs/common';

// Local files
import { ForecastController } from './controller/forecast.controller';
import { ForecastService } from './service/forecast.service';
import { LocationService } from '../core/services/location/location.service';

@Module({
    imports: [HttpModule],
    controllers: [ForecastController],
    providers: [ForecastService, LocationService]
})
export class ForecastModule { }
