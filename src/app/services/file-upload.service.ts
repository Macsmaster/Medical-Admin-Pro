import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {
  private base_url = environment.base_url;
  private user!: User;

  constructor(private http: HttpClient) { }

  get uid(){
    return this.user.uid || ''
  }

  get token(){
    return  localStorage.getItem('token') || '';
  }

updateImg(
  file: File,
  type: 'users'|'doctors'|'hospitals',
  id: string
) {
  const formData = new FormData();
  formData.append('image', file);
 return this.http.put(`${ this.base_url }/uploads/${type}/${id}`, formData, {
   headers: {
     'x-token': this.token
   }
 }).pipe(
    map((res: any) => {
      if (res.ok) {
        return res.newNameFile
      } else {
        return false
      }
    }),
 );

}
}
