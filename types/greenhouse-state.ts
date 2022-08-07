export enum ControlMode {
    Automatic = "automatic",
    Manual = "manual",
}
export function control_mode_display(mode?: ControlMode) {
    if(mode === ControlMode.Automatic)
        return "Automatic";
    if(mode === ControlMode.Manual)
        return "Manual";
    return "";
}

export enum EnvironmentState {
    Default = "default",
}
export function environment_state_display(state?: EnvironmentState) {
    if(state === EnvironmentState.Default)
        return "Default";
    return "";
}

export enum IpmState {
    Default = "default",
}
export function ipm_state_display(state?: IpmState) {
    if(state === IpmState.Default)
        return "Default";
    return "";
}

export enum LightningState {
    Default = "default",
}
export function lightning_state_display(state?: LightningState) {
    if(state === LightningState.Default)
        return "Default";
    return "";
}

export enum Weather {
    Default = "default",
}
export function weather_display(weather?: Weather) {
    if(weather === Weather.Default)
        return "Default";
    return "";
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
