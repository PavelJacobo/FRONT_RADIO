import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Programa } from '../../modelos/modelo.index';
import { URL_SERVICE } from '../../config/config.config';
import { map } from 'rxjs/internal/operators';
import { AdminService } from '../admin/admin.service';
import Swal from 'sweetalert2';
import { forkJoin, throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class ProgramaService  {

    public programas: Programa[];
    public totalRegistrosDeProgramas: number;
    constructor(
        public http: HttpClient,
        public _adminService: AdminService,
    ) {
        this.obtenerProgramas().subscribe( (programas: any) => {
            this.programas = programas;
            // console.log(this.programas);
        });
     }

   // ===========================
   // Obtener todos los programas
   // ===========================
    obtenerProgramas(desde?, limit?) {
    let url = `${ URL_SERVICE }/programa`;
    if (desde) {
        url += '?desde=' + desde;
        url += '&limit=' + limit;
    } else if (limit) {
        url += '?limit=' + limit;
    }
    return this.http.get(url).pipe(map((res: any) => {
        this.totalRegistrosDeProgramas = res.total;
        return res.programas;
    }));
  }

  getTotalProgramas() {
    const url = `${URL_SERVICE}/programa`;
    return this.http.get(url).pipe(map((res: any) => {
      this.totalRegistrosDeProgramas = res.total;
      return res.total;
    }));
  }

    // ===========================
   // Obtener programa por id
   // ===========================

   findPrograma(idDePrograma, token?) {
    let url = URL_SERVICE + '/programa/' + idDePrograma;
    url += '?token=' + token;
    return this.http.get(url, idDePrograma);
   }

    // // crearPrograma ( programa: Programa ) {
    // //     let url = `${ URL_SERVICE }/programa`;
    // //     url += '?token=' + this._usuarioService.token;
    // //     return this.http.post( url, programa );
    // // }

    updateProgramas(programas: Programa[], token, idDeUsuario) {
        // console.log('UPDATE PRO', programas, idDeUsuario);
        return new Promise ((resolvedor, reject) => {

            const progs = [];
            const observableBatch = [];
            const programasQueTienenAlUsuario = this.programas.filter((programa: Programa) => {
            return programa.colaboradores.includes(idDeUsuario);
            });
            if (programasQueTienenAlUsuario.length >= 0) {
                programasQueTienenAlUsuario.forEach((programa: Programa) => {
                                    const index = programa.colaboradores.indexOf(idDeUsuario);
                                    programa.colaboradores.splice(index, 1);
                                    let url = URL_SERVICE + '/programa/' + programa._id;
                                    url += '?token=' + token;
                                    observableBatch.push(this.http.put(url, programa).pipe(map((res: any) => console.log(res) )));
                });
            }
            programas.forEach((programa) => {
                let url = URL_SERVICE + '/programa/' + programa._id;
                url += '?token=' + token;
                programa.colaboradores.push(idDeUsuario);
                programa.colaboradores = programa.colaboradores.filter((item, index, inputArray ) => {
                        return inputArray.indexOf(item) === index;
                });
                    observableBatch.push(this.http.put(url, programa).pipe(map((res: any) => {
                        // console.log(res);
                        progs.push(res.programa);
                    } )));
            });
            const promesa = new Promise((resolve) => {
                return forkJoin (observableBatch).subscribe(() => {
                    resolve();
                });
            });
            promesa.then(() => {
                this.obtenerProgramas().subscribe( (res: any) => {
                    this.programas = res;
                    resolvedor(progs);
                });
            });
        });

    }

    updatePrograma(programa, token) {
        let url = URL_SERVICE + '/programa/' + programa._id;
        url += '?token=' + token;
       return this.http.put(url, programa).pipe(map((res) => {
              if ( <any>false) {
                this.obtenerProgramas().subscribe( (resp: any) => {
                    this.programas = resp;
                });
              }
              return res;
            }),
            catchError(err => {
             // Swal('Error', err.error.mensaje, 'error');
             this.manageError(err);
             return throwError(err);
         }));
    }

    crearPrograma(programa, token) {
        let url = URL_SERVICE + '/programa';
        url += '?token=' + token;
        return this.http.post(url, programa).pipe(
            map((res) => {
            return res;
           }),
           catchError(err => {
            // Swal('Error', err.error.mensaje, 'error');
            this.manageError(err);
            return throwError(err);
        })
    );
    }

     getAllIndexes(arr, val) {
        const indexes = [];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === val) {
                indexes.push(i);
            }
        }
        return indexes;
    }

    cambiarImagen( archivo: File, coleccion: string, id: string, ) {
        if (!archivo || archivo === undefined ) {
            return;
        }

       return this._adminService.subirArchivo( archivo, coleccion , id );
       }

    subirImagen( archivo: File, tipo: string ) {
        if (!archivo || archivo === undefined ) {
            return;
        }
        return this._adminService.subirImagen(archivo, tipo);
    }


    removePrograma(programaID, token?) {
        let url = URL_SERVICE + '/programa/' + programaID;
        url += '?token=' + token;
        return this.http.delete(url).pipe(map((res: any) => {
            return res.programa;
        }));
    }

    deleteUserFromPrograma(userID) {
        // console.log(userID, 'USER ID');
        const url = URL_SERVICE + '/programa/user/' + userID;
        // console.log(url);
        return this.http.post(url, {userID}).pipe(map((res: any) => {
            return res;
        }));
    }

    manageError(err: any) {
        // console.log(err.error.errors.name)
        switch (true) {
            case err.statusText === 'Unauthorized':
                Swal('Error', err.statusText, 'error');
                break;
            case err.error.errors.name === 'ValidationError':
                    Swal('Error', err.error.errors.message, 'error');
                break;
            default:
                Swal('Error', err.error.mensaje + ' El campo descripción no puede estar vacío, añada alguna descripción', 'error');
                break;
        }
    }


}
