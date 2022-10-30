export enum ControlMode {
    Automatic = "automatic",
    Manual = "manual",
}
export function control_mode_display(mode?: ControlMode) {
    if(mode === ControlMode.Automatic)
        return "Auto";
    if(mode === ControlMode.Manual)
        return "Manual";
    return "";
}

export interface EnvironmentControl {
    mode: ControlMode;
}

export interface IpmControl {
    mode: ControlMode;
}

export interface IrrigationControl {
    mode: ControlMode;
}

export interface LightingControl {
    mode: ControlMode;
}

export interface EnvironmentStatus {}

export interface IpmStatus {
    next_time?: string;
}

export interface LightingStatus {
    dli?: number;
}

class IrrigationStatus {
    next_time?: string;
    next_zone?: number;
}

export interface Sensor {
    temperature: number;
    humidity: number;
    quantum : number;
}

export interface Control {
    environment: EnvironmentControl;
    ipm: IpmControl;
    lighting: LightingControl;
    irrigation: IrrigationControl;
}

export interface Status {
    environment?: EnvironmentStatus;
    ipm?: IpmStatus;
    lighting?: LightingStatus;
    irrigation?: IrrigationStatus;
}

export interface Actuator {
    heater: boolean;
    exhaust: boolean;
    ventilator: boolean;
    sulfur: boolean;
    lights: boolean;
    valves: boolean[];
}

export interface WeatherCurrent {
    temperature: number;
    humidity: number;
    sky: string;
}

export interface Weather {
    current: WeatherCurrent;
}

export interface EnvironmentRecipe {
    day_temperature: number;
    night_temperature: number;
    humidity_limit: number;
}

export enum SulfurIntensity {
    off = "off",
    low = "low",
    medium = "medium",
    high = "high",
}
export function sulfur_intensity_display(intensity?: SulfurIntensity) {
    switch (intensity) {
        case SulfurIntensity.off:
            return "Off";
        case SulfurIntensity.low:
            return "Low";
        case SulfurIntensity.medium:
            return "Medium";
        case SulfurIntensity.high:
            return "High";
        default:
            return "";
    }
}

export interface IpmRecipe {
    intensity: SulfurIntensity
}

export enum LightingRecipeIntensity {
    low = "low",
    medium = "medium",
    high = "high",
}

export interface LightingRecipe {
    start_at: string;
    stop_at: string;
    intensity: LightingRecipeIntensity;
}

export enum IrrigationFrequency {
    twenty_four_hours = "twenty_four_hours"
}

export interface IrrigationRecipeZone {
    name: string;
    time: string;
    duration: number;
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
}

export interface IrrigationRecipe {
    zones: IrrigationRecipeZone[];
}

export interface Recipes {
    environment: EnvironmentRecipe;
    ipm: IpmRecipe;
    lighting: LightingRecipe;
    irrigation: IrrigationRecipe;
}

export interface GreenhouseState {
    id: number;
    greenhouse_id: number;
    time: Date;
    sensor: Sensor;
    control: Control;
    status?: Status;
    recipes: Recipes;
    actuator: Actuator;
    weather?: Weather;
}
