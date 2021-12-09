import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { IRegisterForm } from '../auth/interfaces/register.interface';
import { AuthService } from '../auth/services/auth.service';
import { IUpdateUser } from '../interfaces/update-user.interface';
import { IUser } from '../interfaces/user.interface';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base_url = environment.base_url;
  public auth2: any;
  public user: User;

  constructor(
    private http: HttpClient,
  ) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.user.uid || '';
  }

  getUsers(from: any = 0): Observable<any> {
    let params = new HttpParams();

    params = params.set('from', from);

    return this.http
      .get<{ total: number; users: IUser[] }>(`${this.base_url}/users`, {
        params,
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res) => {
          const users = res.users.map(
            (user) =>
              new User(
                user.name,
                user.lastname,
                user.email,
                '',
                user.google,
                user.img,
                user.role,
                user.uid
              )
          );
          return {
            total: res.total,
            users,
          };
        })
      );
  }

  createUser(formData: IRegisterForm) {
    return this.http.post(`${this.base_url}/users`, formData).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
      })
    );
  }

  updateProfile(data: any) {
    data = {
      ...data,
      role: this.user.role,
    };
    return this.http.put(`${this.base_url}/users/${this.uid}`, data, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  saveUpdatedData( user: User ) {
    return this.http.put(`${this.base_url}/users/${user.uid}`, user, {
      headers: {
        'x-token': this.token,
      },
    });
  }

  deleteUser(id: string) {
    return this.http.delete(`${this.base_url}/users/${id}`, {
      headers: {
        'x-token': this.token,
      },
    });
  }
}
