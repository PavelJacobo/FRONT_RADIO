import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config.config';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../../modelos/noticia.modelo';
import { map } from 'rxjs/internal/operators/map';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  private token: string;
  private userId: string;
  constructor(public http: HttpClient, public _usuarioService: UsuarioService) {

    this.token = this._usuarioService.token;
    this.userId = this._usuarioService.usuario._id;
   }

  crearNoticia(noticia: Noticia) {
    let url = URL_SERVICE + '/noticia';
    url += '?token=' + this.token;
    return this.http.post(url, noticia).pipe(map((res) => {
      return res;
    }));
  }

  getUsersNoticias() {
    let url = URL_SERVICE + '/noticia/user/' + this.userId;
    url += '?token=' + this.token;
    return this.http.get(url).pipe(map((res: any) => {
      return res.noticias;
    }));
  }

  getNoticiaById(id) {
    let url = URL_SERVICE + '/noticia/' + id;
    url += '?token=' + this.token;
    return this.http.get(url).pipe(map((res: any) => {
      return res.noticia;
    }));
  }

  removeNoticia(id) {
    let url = URL_SERVICE + '/noticia/' + id;
    url += '?token=' + this.token;
    return this.http.delete(url).pipe(map((res: any) => {
      return res;
    }));
  }
}
