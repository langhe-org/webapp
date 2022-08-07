export enum Units {
    Metric = "metric",
    Imperial = "imperial",
}

export interface User {
    id: number;
    name?: string;
    email: string;
    units: Units;
}
