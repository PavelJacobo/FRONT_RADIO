import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config.config';
import { HttpClient } from '@angular/common/http';
import { Usuario, LoginUsuario } from '../../modelos/modelo.index';
import { map } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../admin/admin.service';
import { ProgramaService } from '../admin/programa.service';
import { forkJoin, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string;
    menu: any = [];
    totalRegistrosDeUsuarios = 0;

    constructor(
        public router: Router,
        public http: HttpClient,
        public _adminService: AdminService,
        public _programaService: ProgramaService
    ) {
        this.cargarStorage();
    }

    isLogged() {
        return ( this.token.length > 5 ) ? true : false;
    }

    cargarStorage() {
        if ( localStorage.getItem('token')) {
          this.token = localStorage.getItem('token');
          this.usuario = JSON.parse(localStorage.getItem('usuario'));
          this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
          this.token = '';
          this.usuario = null;
          this.menu = [];
        }
      }

    guardarStorage(id: string, token: string, usuario: Usuario, menu?: any) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));
        this.usuario = usuario;
        this.token = token;
        this.menu = menu;
    }

    login(usuario: LoginUsuario, recordar: boolean = false) {

        if ( recordar ) {
            localStorage.setItem('email', usuario.email );
          } else {
            localStorage.removeItem('email');
          }
        const url = `${URL_SERVICE}/login`;
        return this.http.post(url, usuario)
        .pipe(
            map((res: any) => {
            console.log(res);
            this.guardarStorage(res.id, res.token, res.usuario, res.menu );
            return true;
            }),
            catchError(err => {
                // Swal('Error', err.error.mensaje, 'error');
                this.manageError(err);
                return throwError(err);
            })
        );
    }

    logout() {
        this.usuario = null;
        this.token = '';
        this.menu = [];
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        localStorage.removeItem('menu');
        localStorage.removeItem('id');
        this.router.navigate(['../../']);
    }



    createUser(usuario: Usuario) {
        const url = `${URL_SERVICE}/usuario`;
        return this.http.post(url, usuario);
    }

    updateUser( usuario: Usuario) {
        let url = URL_SERVICE + '/usuario/' + usuario._id;
        url += '?token=' + this.token;
        return this.http.put( url, usuario ).pipe(map(( res: any ) => {
            if (usuario._id === this.usuario._id) {
                this.usuario = res.usuario;
                const usuarioDB: Usuario = res.usuario;
                this._programaService.updateProgramas(res.usuario.programas, this.token, res.usuario._id)
                .then((responnse: any) => {
                    this.usuario.programas = responnse;
                    usuarioDB.programas = responnse;
                    this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                    Swal('Usuario actualizado', usuario.nombre, 'success');
                    return true;
                });
            }

        }));
    }


    cambiarImagen( archivo: File, coleccion: string, id: string  ) {
        if (!archivo || archivo === undefined ) {
            return;
        }

        this._adminService.subirArchivo( archivo, coleccion , id )
                                 .then((res: any) => {
                                     console.log(res);
                                    this.usuario.img = res.usuario.img;
                                    this.guardarStorage(id, this.token, this.usuario, this.menu );
                                 })
                                 .catch((res: any) => {
                                    console.log(res);
                                 });
       }

    findUser(_idsDeUsuarios) {
        const busquedas = [];
        console.log(_idsDeUsuarios);
        _idsDeUsuarios.forEach((_id) => {
            let url = URL_SERVICE + '/usuario/' + _id;
            url += '?token=' + this.token;
            busquedas.push(this.http.get(url, _id).pipe(map((res: any) => {
                return res.usuario;
            })));
        });
        return forkJoin(busquedas);
    }

    setNewProgramToUser(_idPrograma, _idUser) {
        let url = URL_SERVICE + '/usuario/addprograma/' + _idUser ;
        url += '?token=' + this.token;
        const prog = {
            id: _idPrograma
        };
       return this.http.put(url, prog).pipe(map((res: any ) => {
            console.log(res);
        }));
    }

    getEventos() {
        let url = URL_SERVICE + '/eventocup' ;
        url += '?token=' + this.token;
        return this.http.get(url).pipe(map((res: any) => {
            console.log(res);
              return res.eventos;
        }));
    }

    guardarEvento(evento) {
        let url = URL_SERVICE + '/eventocup' ;
        url += '?token=' + this.token;
        return this.http.post(url, evento).pipe(map((response: any) => {
            console.log(response);
            return response.evento;
        }));
    }

    updateEvento(evento) {
        let url = URL_SERVICE + '/eventocup/' + evento._id  ;
        url += '?token=' + this.token;
        return this.http.put(url, evento).pipe(map((response: any) => {
            return response.evento;
        }));
    }

    removeEvento(eventId) {
        let url = URL_SERVICE + '/eventocup/' + eventId ;
        url += '?token=' + this.token;
        if (confirm('Estás seguro que deseas eliminar esta reserva')) {
            return this.http.delete(url).pipe(map((response: any) => {
                return response.evento;
        }));
        } else {
            return;
        }
    }

    getAllUsers(desde?) {
        let url = URL_SERVICE + '/usuario';
        url += '?token=' + this.token;
        if (desde) {
            url += '&desde=' + desde;
        }
        return this.http.get(url).pipe(map((res: any) => {
              this.totalRegistrosDeUsuarios = res.total;
              return res.usuarios;
        }));
    }

    manageError(err: any) {
        switch (err) {
            case err.statusText === 'Unauthorized':
                Swal('Error', err.statusText, 'error');
                break;
            default:
                Swal('Error', err.error.mensaje, 'error');
                break;
        }
    }


    deleteUser(id: string) {
        let url = URL_SERVICE + '/usuario/' + id;
        url += '?token=' + this.token;

        return this.http.delete(url);
    }

}
