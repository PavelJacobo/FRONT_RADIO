import { Injectable } from '@angular/core';
import { URL_SERVICE } from '../../config/config.config';
import { HttpClient } from '@angular/common/http';
import { Noticia } from '../../modelos/noticia.modelo';
import { map } from 'rxjs/internal/operators/map';
@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

  constructor(public http: HttpClient) { }

  crearNoticia(noticia: Noticia, token) {
    let url = URL_SERVICE + '/noticia';
    url += '?token=' + token;
    return this.http.post(url, noticia).pipe(map((res) => {
      return res;
    }));
  }
}
