import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../modelos/noticia.modelo';
import { Usuario, Programa } from '../../modelos/modelo.index';
import { NoticiaService } from 'src/app/services/admin/noticia.service';
import { UsuarioService } from '../../services/admin/usuario.service';
import Swal from 'sweetalert2';
import { ProgramaService } from '../../services/admin/programa.service';

@Component({
  selector: 'app-gestion-web',
  templateUrl: './gestion-web.component.html',
  styles: []
})
export class GestionWebComponent implements OnInit {

  public desde: number;
  public totalRegistros: number;
  objectKeys = Object.keys;
  public noticias: Noticia[];
  public usuarios: Usuario[];
  public programas: Programa[];
  public eventoscalendario: any;
  public target: Object;
  private total: number;
  private popupConfirm = Swal.mixin({
    confirmButtonClass: 'btn btn-success ml-1',
    cancelButtonClass: 'btn btn-danger mr-1',
    buttonsStyling: false,
  });


  constructor(
    public _noticiasService: NoticiaService,
    public _usuarioService: UsuarioService,
    public _programaService: ProgramaService) {
      this.desde = 0;
      this.totalRegistros = 0;
      this.total = 0;
    }

  ngOnInit() {

    this.getNoticias();
    this.getUsuarios();
    this.getProgramas();
  }

  getNoticias() {
    this._noticiasService.getallNoticias().subscribe((noticias: any) => {
      this.noticias = noticias;
      console.log(noticias);
    });
  }

  getUsuarios() {
    this._usuarioService.getAllUsers(this.desde).subscribe((usuarios: any) => {
      this.usuarios = usuarios;
      console.log(usuarios);
    });
  }

  getProgramas() {
    this._programaService.obtenerProgramas().subscribe((programas: any) => {
      console.log(programas);
      this.programas = programas;
    });
  }

  conmutaTarget(target) {
    console.log(target);
     switch (target) {
       case 'noticias':
         this.target = this.noticias;
         break;
         case 'usuarios':
         this.target = this.usuarios;
         break;
         case 'programas':
         console.log(this.programas);
         this.target = this.programas;
         break;
       default:
         break;
     }
  }

  eraseNoticia(noticiaID, index) {
  console.log(noticiaID);
  console.log(index);
  this.popupConfirm({
    title: 'Estás Seguro que desea eliminar la noticia?',
    text: 'Los cambios no serán reversibles',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this._noticiasService.removeNoticia(noticiaID).subscribe((data: any) => {
        this.popupConfirm(
          'Borrado!',
          'La noticia ha sido eliminada',
          'success'
        );
        this.noticias.splice(index, 1);
      });
    } else if (
      // Read more about handling dismissals
      result.dismiss === Swal.DismissReason.cancel
    ) {
      this.popupConfirm(
        'Cancelado',
        'La noticia no ha sido eliminada',
        'error'
      );
      return;
    }
  });

  }

  erasePrograma(programaID, index) {
    this.popupConfirm({
      title: 'Estás Seguro que desea eliminar el programa?',
      text: 'Los cambios serán irreversibles',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._programaService.removePrograma(programaID, this._usuarioService.token).subscribe(((res: any) => {
          this.popupConfirm(
            'Borrado!',
            'El programa ha sido eliminado',
            'success'
          );
          this.programas.splice(index, 1);
          this._programaService.obtenerProgramas().subscribe();
        }));
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.popupConfirm(
          'Cancelado',
          'El programa no ha sido eliminado',
          'error'
        );
        return;
      }
    });
  }

  eraseUser(userID) {

    this.popupConfirm({
      title: 'Estás Seguro que desea eliminar el usuario?',
      text: 'Los cambios serán irreversibles',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar!',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        console.log(userID);
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.popupConfirm(
          'Cancelado',
          'El usuario no ha sido eliminado',
          'error'
        );
        return;
      }
    });

  }

  cambiarDesde( valor: number) {
    let desde = this.desde + valor;
    console.log( desde );
    if (desde >= this.total) {

    }
  }

}
