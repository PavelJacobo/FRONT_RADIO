import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICE } from '../config/config.config';
@Pipe({
  name: 'redonda'
})
export class RedondaPipe implements PipeTransform {

  transform(file: any, args?: any): any {
    const path: String = `${URL_SERVICE}`;
    return null;
  }

}
