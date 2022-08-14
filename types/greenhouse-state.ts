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

export interface Sensor {
    temperature: number;
    humidity: number;
    quantum : number;
}

export interface Subsystem {
    mode: ControlMode;
    state: LightningState;
}

export interface Control {
    environment: Subsystem;
    ipm: Subsystem;
    lighting: Subsystem;
    irrigation: Subsystem;
}

export interface Actuator {
    heater: boolean;
    exhaust: boolean;
    ventilator: boolean;
    sulfur: boolean;
    lights: boolean;
    valves: boolean[];
}

export enum SkyWeather {
    Default = "default",
}

export interface WeatherCurrent {
    temperature: number;
    humidity: number;
    sky: SkyWeather;
}

export interface Weather {
    current: WeatherCurrent;
}

export interface GreenhouseState {
    id: number;
    greenhouse_id: number;
    time: Date;
    sensor: Sensor;
    control: Control;
    actuator: Actuator;
    weather?: Weather;
}
