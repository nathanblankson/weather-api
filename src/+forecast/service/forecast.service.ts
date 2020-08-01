// Nest dependencies
import { Injectable, HttpService, BadRequestException } from '@nestjs/common';

// Local files
import { configService } from '../../config/config.service';
import { ForecastRO } from '../../core/models/forecast.interface';
import { LocationService } from '../../core/services/location/location.service';
import { Location } from '../../core/models/location.interface';

@Injectable()
export class ForecastService {
    private OPENWEATHERMAP_KEY: string = configService.getOpenWeatherMapKey();
    private OPENWEATHERMAP_ONECALL: string = `${configService.getOpenWeatherMapUrl()}/onecall`;
    private OPENWEATHERMAP_ONECALL_EXCLUSIONS: string = 'hourly,minutely';

    constructor(private _http: HttpService, private _locationService: LocationService) { }

    async getForecastBasicSearch(query: string): Promise<ForecastRO> {
        const location = await this._locationService.getLocationBasicSearch(query);
        return this.getForecast(location);
    }

    async getForecastAdvancedSearch(query: Location): Promise<ForecastRO> {
        const { street, city, state, postalCode } = query;
        const location = await this._locationService.getLocationAdvancedSearch(street, city, state, postalCode);
        return this.getForecast(location);
    }

    private async getForecast(location: Location) {
        return await this._http
            .get(`${this.OPENWEATHERMAP_ONECALL}?lat=${location.coords.lat}&lon=${location.coords.lng}&exclude=${this.OPENWEATHERMAP_ONECALL_EXCLUSIONS}&appid=${this.OPENWEATHERMAP_KEY}`)
            .toPromise()
            .catch((err) => {
                throw new BadRequestException('We could not find any forecast data for the provided location.', err);
            })
            .then((res) => {
                return {
                    forecast: {
                        current: res.data.current,
                        daily: res.data.daily,
                    },
                    location
                };
            });
    }
}
