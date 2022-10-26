import { Units } from "../types/user";

export function temperatureImperialToMetric(value: number): number {
    return (value - 32) / 1.8;
}
export function temperatureMetricToImperial(value: number): number {
    return (value * 1.8) + 32;
}

export function temperatureToMetric(value: number, from: Units): number {
    if(from === Units.Imperial)
        value = temperatureImperialToMetric(value);
    return value;
}
export function temperatureFromMetric(value: number, to: Units): number {
    if(to === Units.Imperial)
        value = temperatureMetricToImperial(value);
    return value;
}

export function unitsSymbol(units: Units) {
    switch (units) {
        case Units.Metric:
            return "°C";
        case Units.Imperial:
            return "°F";
    }
}
