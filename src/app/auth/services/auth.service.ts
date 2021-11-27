import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ILogin } from '../interfaces/login.interface';
import { IRegisterForm } from '../interfaces/register.interface';


declare const gapi: any;
const base_url = environment.base_url;


@Injectable({
  providedIn: 'root'
})



export class AuthService {

  public auth2: any

  constructor(private http: HttpClient,
   private router: Router,
   private ngZone: NgZone) {
     this.googleInit();
   }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token);
      }),
      map(res => true),
      catchError( error => of( false ) )
    )
  }

   createUser(formData: IRegisterForm){
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((res: any) => {
          localStorage.setItem('token', res.token)
        })
      )
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
          localStorage.setItem('token', res.token)
        })
      )
  }

  googleInit(){
    return new Promise( (resolve: any) => {
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
    this.auth2.signOut().then( () => {
      this.ngZone.run(() => {
        this.router.navigateByUrl('/login');
      })
    });
  }
}
