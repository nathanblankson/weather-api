// Local files
import { Location } from './location.interface';

export interface ForecastRO {
    forecast: {
        current: ForecastCurrent,
        daily: ForecastDaily[],
    }
    location: Location
}

export interface ForecastBase {
    dt: Date,
    sunrise: Date,
    sunset: Date,
    pressure: number,
    humidity: number,
    dew_point: number,
    uvi: number,
    clouds: number,
    weather: Weather[],
    wind_speed: number,
    wind_deg: number,
}

export interface ForecastCurrent extends ForecastBase {
    temp: number,
    feels_like: number,
    visibility: number,
    rain: any
}

export interface ForecastDaily extends ForecastBase {
    temp: Temperature,
    feels_like: TemperatureBase,
}

export interface TemperatureBase {
    day: number,
    night: number,
    eve: number,
    morn: number
}

export interface Temperature extends TemperatureBase {
    min: number,
    max: number
}

export interface Weather {
    id: number,
    main: string,
    description: string,
    icon: string
}
