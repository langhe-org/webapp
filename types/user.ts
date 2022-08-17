export enum Units {
    Metric = "metric",
    Imperial = "imperial",
}

export function units_display(units: Units) {
    if(units === Units.Metric)
        return "Metric";
    if(units === Units.Imperial)
        return "Imperial";
    return "";
}

export interface User {
    id: number;
    name?: string;
    email: string;
    units: Units;
    greenhouse_ids: number[];
}
