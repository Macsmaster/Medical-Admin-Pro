import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Doctor, IDoctor } from '../shared/models/doctor.model';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class DoctorService {

  constructor(
    private http: HttpClient ) { }

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


  getDoctors(from: any = 0):Observable<any>{

    let params = new HttpParams();

    params = params.set('from', from);

    const url = `${base_url}/doctors`
    return this.http.get<{ totalRegisters: number; doctors: Doctor[] }>(url, {
      params,
      headers: {
        'x-token': this.token
      }
    })
      .pipe(
        map((res) => {

          const doctors = res.doctors
            return {
              total: res.totalRegisters,
              doctors,
            };
          })
      )

  }

  getDoctorById(id: string):Observable<any>{
    const url = `${base_url}/doctors/${id}`;
    return this.http.get(url, this.headers)
      .pipe(
        map( (resp: { ok: Boolean, doctor: Doctor}) => resp.doctor)
      )
  }


  createDoctor(doctor: Doctor): Observable<any>{
    const url = `${base_url}/doctors`;
    return this.http.post(url, doctor, this.headers );
  }

  updateDoctor(doctor): Observable<any>{
    const url = `${base_url}/doctors/${doctor._id}`;
    return this.http.put(url, doctor, {
      headers: {
        'x-token': this.token
      }
    });
  }

  deleteDoctor(id: string): Observable<any> {
    const url = `${base_url}/doctors/${id}`;
    return this.http.delete(url, {
      headers: {
        'x-token': this.token
      }
    } );
  }





}
