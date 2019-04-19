import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config.config';
@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string | Object, tipo: string = 'usuario'): any {
    let  url = URL_SERVICE + '/img';
    if ( ! img ) {
      return url + '/usuario/xxx';
    }
    switch ( tipo ) {
      case 'usuario':
        url += '/usuario/' + img;
      break;
      case 'noticia':
        url += '/noticia/' + img;
      break;
      case 'programa':
        url += '/programa/' + img;
      break;
      case 'redonda':
        url += '/redonda/' + img['file'];
      break;

      default:
      // console.log('tipo de imagen no existe, usuario, noticia, programa');
        url += '/usuarios/xxx';
    }
    return url;
  }

}
