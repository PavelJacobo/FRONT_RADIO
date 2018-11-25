import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICE } from '../../config/config.config';
import { UsuarioService } from './usuario.service';
import { map } from 'rxjs/internal/operators';
@Injectable({
    providedIn: 'root'
})
export class OcupacionService {
public totalReservas;

    constructor(
        public http: HttpClient,
        public _usuarioService: UsuarioService
    ) {}

    getAllReservas(desde?, limit?) {
        console.log(desde);
        let url = URL_SERVICE + '/eventocup';
        if (desde) {
          url += '?desde=' + desde;
          url += '&limit=' + limit;
        } else if (limit) {
          url += '?limit=' + limit;
        }
        return this.http.get(url).pipe(map((res: any) => {
            this.totalReservas = res.total;
            return res.eventos;
        }));
    }

    eraseReserva(id) {
        let url = URL_SERVICE + '/eventocup/' + id;
        url += '?token=' + this._usuarioService.token;
        return this.http.delete(url).pipe(map((res: any) => {
            return res.evento;
        }));
    }
}
