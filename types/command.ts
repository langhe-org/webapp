import { ControlMode, LightingRecipeIntensity, SulfurIntensity } from "./greenhouse-state";

export interface EnvironmentRecipeCommand {
    day_temperature?: number;
    night_temperature?: number;
    humidity_limit?: number; // should be enum (hight, medium, high)?
}

export interface EnvironmentCommand {
    mode?: ControlMode;
    exhaust?: boolean;
    heater?: boolean;
    ventilator?: boolean;
    recipe?: EnvironmentRecipeCommand;
}

export interface IpmRecipeCommand {
    intensity?: SulfurIntensity;
}

export interface IpmCommand {
    mode?: ControlMode;
    sulfur?: boolean;
    recipe?: IpmRecipeCommand;
}

export interface LightingRecipeCommand {
    start_at?: string;
    stop_at?: string;
    intensity?: LightingRecipeIntensity;
}

export interface LightingCommand {
    mode?: ControlMode;
    light?: boolean;
    recipe?: LightingRecipeCommand;
}

export interface IrrigationRecipeCommand {
    start_window?: string;
    stop_window?: string;
    duration?: number;
    frequency?: number;
}

export interface IrrigationCommand {
    mode?: ControlMode;
    trigger_valve?: (true | undefined)[];
    recipes?: (IrrigationRecipeCommand | undefined)[];
}

export interface Command {
    environment?: EnvironmentCommand;
    ipm?: IpmCommand;
    lighting?: LightingCommand;
    irrigation?: IrrigationCommand;
}
