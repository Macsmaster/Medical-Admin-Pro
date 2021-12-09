import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [{
    title: 'Dashboard',
    icon: 'mdi mdi-gauge',
    submenu: [
      { title: 'Inicio', url: '', },
      { title: 'Progreso', url: 'progress', },
      { title: 'Graficos', url: 'graphics', },
      { title: 'Promesas', url: 'promises', },
      { title: 'Rxjs', url: 'rxjs', },

    ]

  },
  {
    title: 'Mantenimientos',
    icon: 'mdi mdi-folder-lock-open',
    submenu: [
      { title: 'Usuarios', url: 'users', },
      { title: 'Hospitales', url: 'hopitals', },
      { title: 'Doctores', url: 'doctors', },
    ]

  }]

  constructor() { }
}
