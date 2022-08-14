export enum GreenhouseType {
    proto_1_ithaca = "proto_1_ithaca",
}

export interface Greenhouse {
    id: number;
    name?: String;
    type: GreenhouseType;
    location_name?: String;
    longitude: number;
    latitude: number;
    timezone: string;
}
