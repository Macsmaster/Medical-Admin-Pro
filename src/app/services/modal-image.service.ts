import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModalImageService {
  private base_url = environment.base_url;
  public img: string;
  public type: 'users' | 'doctors' | 'hospitals';
  public uid: string;
  public newImg: EventEmitter<string> = new EventEmitter<string>()
  private _hiddeModal: boolean = true;

  get hiddeModal() {
    return this._hiddeModal;
  }

  constructor() { }

  openModal(
    type: 'users' | 'doctors' | 'hospitals',
    id: string,
    img: string = 'not-found-image'
  ) {
    this._hiddeModal = false
    this.type = type;
    this.uid = id;

    const url = `${this.base_url}/upload/${type}/${img}`
    if ( img.includes('https') ) {
      this.img = img;
    } else {
      this.img = url
    }
  }


  closeModal() {
    this._hiddeModal = true
  }
}
