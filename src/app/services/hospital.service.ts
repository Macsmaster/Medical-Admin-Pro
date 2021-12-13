import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hospital } from '../shared/models/hospital.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private base_url = environment.base_url

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  getAllHospitals(from: any = 0):Observable<any> {

    let params = new HttpParams();

    params = params.set('from', from);

    const url = `${this.base_url}/hospitals`;
    return this.http.get<{ totalRegisters: number; hospitals: Hospital[] }>(url, {
        params,
        headers: {
          'x-token': this.token,
      }})
      .pipe(
        map((res) => {
          const hospitals = res.hospitals.map(
            (hospital) =>
              new Hospital(
                hospital.name,
                hospital._id,
                hospital.img,
                hospital.user,
              )
          );
          return {
            total: res.totalRegisters,
            hospitals,
          };
        })
      );
  }

  createHospital(name: string):Observable<{}> {
    const url = `${this.base_url}/hospitals`;
    return this.http.post<{}>(url, { name }, this.headers)
  }

  updateHospital(name: string, _id: string):Observable<{}> {
    const url = `${this.base_url}/hospitals/${_id}`;
    return this.http.put<{}>(url, { name }, this.headers)
  }

  deleteHospital(_id: string){
    const url = `${this.base_url}/hospitals/${_id}`;
    return this.http.delete<{}>(url, this.headers)
  }

}
