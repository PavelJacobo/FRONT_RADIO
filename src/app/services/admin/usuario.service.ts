import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config.config';
import { HttpClient } from '@angular/common/http';
import { Usuario, LoginUsuario } from '../../modelos/modelo.index';
import { map } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminService } from '../admin/admin.service';
import { ProgramaService } from '../admin/programa.service';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    usuario: Usuario;
    token: string;

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
        } else {
          this.token = '';
          this.usuario = null;
        }
      }

    guardarStorage(id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        this.usuario = usuario;
        this.token = token;
    }

    login(usuario: LoginUsuario, recordar: boolean = false) {

        if ( recordar ) {
            localStorage.setItem('email', usuario.email );
          } else {
            localStorage.removeItem('email');
          }
        const url = `${URL_SERVICE}/login`;
        return this.http.post(url, usuario)
        .pipe(map((res: any) => {
            this.guardarStorage(res.id, res.token, res.usuario );
            return true;
          }));
    }

    logout() {
        this.usuario = null;
        this.token = '';
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        this.router.navigate(['/home']);
    }



    createUser(usuario: Usuario) {
        const url = `${URL_SERVICE}/usuario`;
        return this.http.post(url, usuario);
    }

    updateUser( usuario: Usuario) {
        let url = URL_SERVICE + '/usuario/' + this.usuario._id;
        url += '?token=' + this.token;
        return this.http.put( url, usuario ).pipe(map(( res: any ) => {
            this.usuario = res.usuario;
            const usuarioDB: Usuario = res.usuario;
            this._programaService.updateProgramas(res.usuario.programas, this.token, res.usuario._id)
            .then((responnse: any) => {
                this.usuario.programas = responnse;
                usuarioDB.programas = responnse;
                this.guardarStorage(usuarioDB._id, this.token, usuarioDB);
                Swal('Usuario actualizado', usuario.nombre, 'success');
                return true;
            });
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
                                    this.guardarStorage(id, this.token, this.usuario );
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

}
