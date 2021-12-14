import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IUpdateUser } from 'src/app/interfaces/update-user.interface';
import { User } from 'src/app/shared/models/user.model';
import { environment } from 'src/environments/environment.prod';
import { ILogin } from '../interfaces/login.interface';
import { IRegisterForm } from '../interfaces/register.interface';


const base_url = environment.base_url;
declare const gapi: any;


@Injectable({
  providedIn: 'root'
})

export class AuthService {



  public auth2: any;
  public user!: User;

  constructor(private http: HttpClient,
   private router: Router,
   private ngZone: NgZone) {
     this.googleInit();
   }

   // Getters

  get token() {
  return localStorage.getItem('token') || '';
  }


  get uid():string {
    return this.user.uid || '';
  }

  get role():'ADMIN_ROLE' | 'USER_ROLE' {
    return this.user.role;
  }


  login(formData: ILogin){
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      )
  }


  loginGoogle(token: any){
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((res: any) => {
          this.localStorageSave(res.token, res.menu);
        })
      )
  }

  googleInit() {
    return new Promise<void>( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '514207968167-slt2gs3c66lcn9phslmfu3l9e83r736e.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })

  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }

  localStorageSave(token: string, menu: string){
    localStorage.setItem('token', token );
    localStorage.setItem('menu', JSON.stringify(menu));
  }


  validateToken(): Observable<boolean> {
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (res: any) => {
        const { email, google, lastname, name, role, img = '', uid } = res.user;
        this.user = new User(name, lastname, email, '', google, img,  role, uid );
        this.localStorageSave(res.token, res.menu);
        return true;
      }),
      catchError( error => {
        return of(false)
      } )
    );
  }

  // User functions

createUser(formData: IRegisterForm){
  return this.http.post(`${base_url}/users`, formData)
    .pipe(
      tap((res: any) => {
        this.localStorageSave(res.token, res.menu);
      })
    )
}

updateProfile( data: IUpdateUser ) {
    data = {
      ...data,
      role: this.user.role,
      lastname: this.user.lastname
    };
    return this.http.put(`${ base_url }/users/${ this.uid }`, data, {
      headers: {
        'x-token': this.token
      }
    });
  }
}
