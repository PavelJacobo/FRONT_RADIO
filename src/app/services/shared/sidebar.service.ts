import { Injectable } from '@angular/core';
import { UsuarioService } from '../admin/usuario.service';

@Injectable({
    providedIn: 'root'
})
export class SidebarService {
  menu: any = [];
// menu: any = [
//     {
//       titulo: 'Perfil',
//       icono: 'far fa-user',
//       submenu: [
//         { titulo: 'Salir', icon: 'fas fa-sign-out-alt' },
//         { titulo: 'Mi usuario', url: 'perfil', icon: 'far fa-user' }
//       ]
//     },
//     {
//       titulo: 'Administración',
//       icono: 'fas fa-toolbox',
//       submenu: [
//         { titulo: 'Noticias', url: 'noticias', icon : 'far fa-newspaper'},
//         { titulo: 'Programación', url: 'programacion', icon : 'far fa-clock'},
//         { titulo: 'Reservar', url: 'ocupacion', icon : 'far fa-calendar-alt'},
//         { titulo: 'Perfil Programas', url: 'perfil_programa', icon : 'fas fa-broadcast-tower'}
//       ]
//     }
//   ];
    constructor(
      public _usuarioService: UsuarioService
    ) {
      this.menu = this._usuarioService.menu;
    }

}
