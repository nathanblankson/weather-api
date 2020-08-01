// Nest dependencies
import { Controller, Get, Query, Post, Body } from '@nestjs/common';

// Local files
import { ForecastService } from '../service/forecast.service';
import { Location } from '../../core/models/location.interface';

@Controller('forecast')
export class ForecastController {
    constructor(private _forecastService: ForecastService) { }

    @Get()
    forecastBasicSearch(@Query('q') query: string) {
        return this._forecastService.getForecastBasicSearch(query);
    }

    @Post()
    forecastAdvancedSearch(@Body() query: Location) {
        return this._forecastService.getForecastAdvancedSearch(query);
    }
}
