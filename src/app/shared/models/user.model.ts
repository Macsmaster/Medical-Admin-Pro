import { environment } from "../../../environments/environment"

const base_url = environment.base_url;
export class User  {
  constructor(
    public name: string,
    public lastname: string,
    public email: string,
    public password?: string,
    public google?: boolean,
    public img?: string,
    public role?: string,
    public uid?: string
  ){
  }
  get getImg() {
    if (!this.img){
      return `${base_url}/uploads/users/not-found`;
    } else if(this.img.includes('https')){
      return this.img;
    } else if ( this.img ) {
      return `${base_url}/uploads/users/${this.img}`;
    } else {
      return `${base_url}/uploads/users/not-found`;
    }
  }
}
