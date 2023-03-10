import { InjectionToken } from "@angular/core";
import { environment } from "./environments/environment";
import { Environment } from "./ienvironment";

export const ENV = new InjectionToken<Environment>('env');

export function getEnv(): Environment {
	return environment;
}