import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICE } from '../../config/config.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AdminService {

    constructor(
        public router: Router,
        public http: HttpClient
    ) {}

    subirArchivo( archivo: File, tipo: string, id?: string) {

        // tslint:disable-next-line:no-shadowed-variable
        return new Promise(( resolve, reject) => {

            const formData = new FormData();
            const xhr = new XMLHttpRequest();

            formData.append( 'imagen', archivo, archivo.name );

            xhr.onreadystatechange = () => {
              if ( xhr.readyState === 4 ) {
                if ( xhr.status === 200 ) {
                  console.log( 'imagen subida' );
                  resolve( JSON.parse( xhr.response ) );
                } else {
                  console.log( 'Falló la subida' );
                  reject( xhr.response );
                }
              }
            };

            const url = URL_SERVICE + '/upload/' + tipo + '/' + id;
            xhr.open('PUT', url, true);
            xhr.send( formData );
        });
      }

      subirImagen( archivo: File ) {
        return new Promise(( resolve, reject) => {
        const formData = new FormData();
        const xhr = new XMLHttpRequest();

        formData.append( 'imagen', archivo, archivo.name );
        xhr.onreadystatechange = () => {
          if ( xhr.readyState === 4 ) {
            if ( xhr.status === 200 ) {
              console.log( 'imagen subida' );
              resolve( JSON.parse( xhr.response ) );
            } else {
              console.log( 'Falló la subida' );
              reject( xhr.response );
            }
          }
        };
        const url = URL_SERVICE + '/upload/imagen';
            xhr.open('POST', url, true);
            xhr.send( formData );
      });
      }


}
