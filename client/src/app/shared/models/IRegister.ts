import { IAddress } from './address';
import { IMeasurements } from './IMeasurements';

export interface IRegister {
    displayName: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    gender: string;
    birthDate: string;
    phoneNumber1: string;
    phoneNumber2: string;
    addressDetails: IAddress;
    measurements: IMeasurements;
}
