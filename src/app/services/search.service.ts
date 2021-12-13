import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../interfaces/user.interface';
import { Doctor } from '../shared/models/doctor.model';
import { Hospital } from '../shared/models/hospital.model';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private base_url = environment.base_url;
  private user!: User;
  private transformUsers(results: any[]): User[] {
    return results.map(
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
  }
  private transformHospital(results: any[]): Hospital[] {
    return results;
  }

  private transformDoctors(results: any[]): Doctor[] {
    return results;
  }

  get token() {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token,
      },
    };
  }

  constructor(private http: HttpClient) {}

  getBySearch(
    type: 'users' | 'doctors' | 'hospitals',
    term: string
  ): Observable<any> {
    const url = `${this.base_url}/all/collection/${type}/${term}`;
    return this.http.get<any[]>(url, this.headers).pipe(
      map((res: any) => {
        switch (type) {
          case 'users':
            return this.transformUsers(res.results);
          case 'hospitals':
            return this.transformHospital(res.results);
          case 'doctors':
            return this.transformDoctors(res.results);
          default:
            return [];
        }
      })
    );
  }
}
