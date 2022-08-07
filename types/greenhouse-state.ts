export enum ControlMode {
    Automatic = "automatic",
    Manual = "manual",
}

export enum EnvironmentState {
    Default = "default",
}

export enum IpmState {
    Default = "default",
}

export enum LightningState {
    Default = "default",
}

export enum Weather {
    Default = "default",
}

export interface GreenhouseState {
    id: number;
    greenhouse_id: number;
    time: Date;
    timezone: number;
    dst: Boolean;
    temperature: number;
    humidity: number;
    quantum: number;
    environment_mode: ControlMode;
    environment_state: EnvironmentState;
    ipm_mode: ControlMode;
    ipm_state: IpmState;
    lighting_mode: ControlMode;
    lighting_state: LightningState;
    heater: Boolean;
    exhaust: Boolean;
    ventilator: Boolean;
    sulfur: Boolean;
    weather_temperature?: number;
    weather_humidity?: number;
    weather_sky?: Weather;
}
