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


  public noticias: Noticia[];
  private token: string;
  private userId: string;
  public totalRegistroDeNoticias: number;
  constructor(public http: HttpClient, public _usuarioService: UsuarioService) {

    this.token = this._usuarioService.token;
    if ( this._usuarioService.usuario ) {
      this.userId = this._usuarioService.usuario._id;
    }
     // TODO, condifcion return if ternario
   }

  crearNoticia(noticia: Noticia) {
    let url = URL_SERVICE + '/noticia';
    url += '?token=' + this.token;
    return this.http.post(url, noticia).pipe(map((res) => {
      return res;
    }));
  }

  getallNoticias(desde?, limit?) {
    let url = URL_SERVICE + '/noticia';
    if (desde) {
      url += '?desde=' + desde;
      url += '&limit=' + limit;
    } else if (limit) {
      url += '?limit=' + limit;
    }
    return this.http.get(url).pipe(map((res: any) => {
      this.totalRegistroDeNoticias = res.total;
      return res.noticias;
    }));
  }

  getNoticias(tipo?) {
    const url = URL_SERVICE + '/noticia/tipo/' + tipo;
    return this.http.get(url).pipe(map((res: any) => {
      return res.noticias;
    }));
  }

  getUsersNoticias() {
    if (this.userId !== undefined) {
      let url = URL_SERVICE + '/noticia/user/' + this.userId;
      url += '?token=' + this.token;
      return this.http.get(url).pipe(map((res: any) => {
        return res.noticias;
      }));
    }
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

  updateNoticia(noticia) {
    let url = URL_SERVICE + '/noticia/' + noticia._id;
    url += '?token=' + this.token;
    return this.http.put(url, noticia).pipe(map((res: any) => {
      return res;
    }));
  }
}
