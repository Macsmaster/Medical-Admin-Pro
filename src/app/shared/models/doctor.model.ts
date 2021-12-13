import { Hospital } from "./hospital.model";

export interface IDoctor {
  _id: string;
  name: string;
  img: string;
}

export class Doctor {
  public name: string;
  public _id: string;
  public img: string;
  public user?: IDoctor;
  public hospital?: Hospital;
}
