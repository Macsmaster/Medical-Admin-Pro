import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { IRegisterForm } from '../auth/interfaces/register.interface';
import { AuthService } from '../auth/services/auth.service';
import { IUpdateUser } from '../interfaces/update-user.interface';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private base_url = environment.base_url;
  public auth2: any;
  public user: User;

  constructor(private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone) { }

  get token():string {
    return localStorage.getItem('token') || '';
    }

  get uid():string {
    return this.user.uid || '';
  }


  createUser(formData: IRegisterForm){
    return this.http.post(`${this.base_url}/users`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      )
  }

updateProfile( data: IUpdateUser ) {
  data = {
      ...data,
      role: this.user.role
    };
    return this.http.put(`${ this.base_url }/users/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });

  }


};
