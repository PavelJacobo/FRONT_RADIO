import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/admin/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( public _usuarioService: UsuarioService, public router: Router ) {

  }
  canActivate() {
    if ( this._usuarioService.isLogged()) {
      return true;
    } else {
      // console.log('Bloqueado por GUARD');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
