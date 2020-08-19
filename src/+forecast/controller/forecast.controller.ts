// Nest dependencies
import { Controller, Get, Query, Post, Body, UseGuards } from '@nestjs/common';

// Local files
import { ForecastService } from '../service/forecast.service';
import { Location } from '../../core/models/location.interface';
import { JwtAuthGuard } from '../../core/guards/jwt-auth.guard';

@Controller('forecast')
export class ForecastController {
    constructor(private _forecastService: ForecastService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    forecastBasicSearch(@Query('q') query: string) {
        return this._forecastService.getForecastBasicSearch(query);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    forecastAdvancedSearch(@Body() query: Location) {
        return this._forecastService.getForecastAdvancedSearch(query);
    }
}
