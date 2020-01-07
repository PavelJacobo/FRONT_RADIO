import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../services/admin/usuario.service';
import Swal from 'sweetalert2';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}
  canActivate(): Promise<boolean> | boolean {
    // console.log('Token Guard');
    const token = this._usuarioService.token;
    const decode = jwt_decode(token);
    // const payload = JSON.parse( atob(token.split('.')[1]));
    // console.log(payload, 'payload');
    const expirado = this.expirado(decode.exp);
    if (expirado) {
      this.router.navigate(['/login']);
      Swal('alert', 'Sesión Expirada, por favor reinicie sesión', 'error');
      return false;
    }
    return this.verificaRenueva(decode.exp);
  }

  verificaRenueva(fechaExp: number): Promise<boolean> {
   return new Promise((resolve, reject) => {
     const tokenExp = new Date( fechaExp * 1000);
     const ahora = new Date();
     ahora.setTime( ahora.getTime() + ( 4 * 60 * 60 * 1000));
    //  console.log(tokenExp);
    //  console.log( ahora);

     if ( tokenExp.getTime() > ahora.getTime()) {
      resolve(true);
     } else {
       this._usuarioService.renuevaToken().subscribe(
          () => {
            resolve(true);
          },
          () => {
            this.router.navigate(['/login']);
            reject(false);
          }
       );
     }
   });
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if ( fechaExp < ahora)  {
      return true;
    } else {
      return false;
    }
  }
}
