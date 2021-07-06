import { IAddress } from "./address";

export interface IUser {
    email: string;
    displayName: string;
    token: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    reviewed: boolean;
    gender: string;
}
