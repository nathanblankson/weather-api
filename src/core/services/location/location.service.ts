// Nest dependencies
import { Injectable, HttpService, InternalServerErrorException, BadRequestException } from '@nestjs/common';

// Local files
import { Location } from '../../models/location.interface';
import { configService } from '../../../config/config.service';

@Injectable()
export class LocationService {
    private MAPQUEST_KEY: string = configService.getMapquestKey();
    private MAPQUEST_ADDRESS: string = `${configService.getMapquestUrl()}/address`;

    constructor(private _http: HttpService) { }

    async getLocationBasicSearch(query: string): Promise<Location> {
        return await this._http
            .get(`${this.MAPQUEST_ADDRESS}?key=${this.MAPQUEST_KEY}&location=${query}&maxResults=1&thumbMaps=false`)
            .toPromise()
            .catch((err) => {
                throw new InternalServerErrorException('An unexpected error has occurred.', err);
            })
            .then((res) => {
                if (!res.data.results[0].locations) {
                    throw new BadRequestException('The provided location could not be found', 'location_not_found');
                }
                return {
                    city: res.data.results[0].locations[0].adminArea5,
                    state: res.data.results[0].locations[0].adminArea3,
                    country: res.data.results[0].locations[0].adminArea1,
                    postalCode: res.data.results[0].locations[0].postalCode,
                    coords: res.data.results[0].locations[0].latLng
                };
            });
    }

    async getLocationAdvancedSearch(street: string, city: string, state: string, postalCode: string): Promise<Location> {
        return await this._http
            .get(`${this.MAPQUEST_ADDRESS}?key=${this.MAPQUEST_KEY}&street=${street}&city=${city}&state=${state}&postalCode=${postalCode}maxResults=1&thumbMaps=false`)
            .toPromise()
            .catch((err) => {
                throw new InternalServerErrorException('An unexpected error has occurred.', err);
            })
            .then((res) => {
                if (!res.data.results[0].locations) {
                    throw new BadRequestException('The provided location could not be found', 'location_not_found');
                }
                return {
                    city: res.data.results[0].locations[0].adminArea5,
                    state: res.data.results[0].locations[0].adminArea3,
                    country: res.data.results[0].locations[0].adminArea1,
                    postalCode: res.data.results[0].locations[0].postalCode,
                    coords: res.data.results[0].locations[0].latLng
                };
            });
    }
}
