import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
menu: any = [
    {
      titulo: 'Perfil',
      icono: 'far fa-user',
      submenu: [
        { titulo: 'Salir' },
        { titulo: 'Mi usuario', url: 'perfil' }
      ]
    },
    {
      titulo: 'Administración',
      icono: 'fas fa-toolbox',
      submenu: [
        { titulo: 'Noticias', url: 'noticias', icon : 'far fa-newspaper'},
        { titulo: 'Programación', url: 'programacion', icon : 'far fa-clock'},
        { titulo: 'Reserva', url: 'ocupacion', icon : 'far fa-calendar-alt'},
        { titulo: 'Programa', url: 'perfil_programa', icon : 'fas fa-broadcast-tower'}
      ]
    }
  ];
    constructor() {}

}
