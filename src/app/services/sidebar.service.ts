import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any;

  constructor(private router: Router) { }


  onLoadMenu(){
    this.menu = JSON.parse(localStorage.getItem('menu'))
    if ( this.menu.lenght === 0 ) {
     this.router.navigateByUrl('/login');
    }
  }

}
