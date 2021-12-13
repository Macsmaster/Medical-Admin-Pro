import { environment } from "../../../environments/environment"
interface _hospitalUser {
  _id: string;
  name: string;
  img: string
}


export class Hospital  {
  constructor(

    public name: string,
    public _id: string,
    public img?: string,
    public user?: _hospitalUser,
  ){
  }

}
