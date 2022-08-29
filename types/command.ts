import { ControlMode } from "./greenhouse-state";

export interface EnvironmentRecipeCommand {
    day_temperature?: number;
    night_temperature?: number;
    humidity_limit?: number; // should be enum (hight, medium, high)?
}

export interface EnvironmentCommand {
    mode?: ControlMode;
    exhaust?: boolean;
    heat?: boolean;
    vent?: boolean;
    recipe?: EnvironmentRecipeCommand;
}

export interface IpmRecipeCommand {
    intensity?: number; // should be enum (hight, medium, high)?
}

export interface IpmCommand {
    mode?: ControlMode;
    sulfur?: boolean;
    recipe?: IpmRecipeCommand;
}

export interface LightingRecipeCommand {
    start_at?: string;
    stop_at?: string;
    intensity?: number; // should be enum (hight, medium, high)?
}

export interface LightingCommand {
    mode?: ControlMode;
    light?: boolean;
    recipe?: LightingRecipeCommand;
}

export interface IrrigationRecipeZoneCommand {
    start_window?: string;
    stop_window?: string;
    duration?: number;
    frequency?: number;
}

export interface IrrigationRecipeCommand {
    zones?: IrrigationRecipeZoneCommand[];
}

export interface IrrigationCommand {
    mode?: ControlMode;
    trigger_valve?: number;
    recipe?: IrrigationRecipeCommand;
}

export interface Command {
    environment?: EnvironmentCommand;
    ipm?: IpmCommand;
    lighting?: LightingCommand;
    irrigation?: IrrigationCommand;
}
