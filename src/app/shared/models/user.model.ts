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

    this.getImg
  }
  get getImg() {
    if(this.img.includes('https')){
      console.log(this.img)
      return this.img;
    }
    if ( this.img ) {
      return `${base_url}/uploads/users/${this.img}`;
    } else {
      return `${base_url}/uploads/users/not-found`;
    }
  }
}
