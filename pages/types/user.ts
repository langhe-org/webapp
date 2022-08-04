export enum Units {
    Metric,
    Imperial,
}

export interface User {
    id: number;
    name?: string;
    email: string;
    units: Units;
}
