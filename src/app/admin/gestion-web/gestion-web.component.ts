import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../modelos/noticia.modelo';
import { Usuario, Programa } from '../../modelos/modelo.index';
import { NoticiaService } from 'src/app/services/admin/noticia.service';
import { UsuarioService } from '../../services/admin/usuario.service';
import Swal from 'sweetalert2';
import { ProgramaService } from '../../services/admin/programa.service';
import { OcupacionService } from '../../services/admin/ocupacion.service';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-gestion-web',
  templateUrl: './gestion-web.component.html',
  styles: []
})
export class GestionWebComponent implements OnInit {

  public desde: number;
  public limit: number;
  public totalRegistros: number;
  public inicioAgenda: string;
  public finAgenda: string;
  objectKeys = Object.keys;
  public noticias: Noticia[];
  public usuarios: Usuario[];
  public programas: Programa[];
  public eventos: any;
  public redonda: Object;
  public target: Object;
  private total: number;
  private clickOnPwd: number;
  public enablePasswd: boolean;
  private pdfRedonda: any;
  public files: any;
  private popupConfirm = Swal.mixin({
    confirmButtonClass: 'btn btn-success ml-1',
    cancelButtonClass: 'btn btn-danger mr-1',
    buttonsStyling: false,
  });


  constructor(
    public _noticiasService: NoticiaService,
    public _usuarioService: UsuarioService,
    public _programaService: ProgramaService,
    public _ocupacionService: OcupacionService,
    public _adminService: AdminService) {
      this.desde = 0;
      this.limit = 5;
      this.totalRegistros = 0;
      this.total = 0;
      this.enablePasswd = false;
      this.clickOnPwd = 0;
      this.redonda = {};
    }

  ngOnInit() {

    this.getNoticias();
    this.getUsuarios();
    this.getProgramas();
    this.getReservas();
  }

  getNoticias() {
    this._noticiasService.getallNoticias(this.desde, this.limit).subscribe((noticias: any) => {
      this.noticias = noticias;
    });
  }

  getUsuarios() {
    this._usuarioService.getAllUsers(this.desde).subscribe((usuarios: any) => {
      this.usuarios = usuarios;
    });
  }

  getProgramas() {
    this._programaService.obtenerProgramas(this.desde, this.limit).subscribe((programas: any) => {
      this.programas = programas;
    });
  }

  getReservas() {
    this._ocupacionService.getAllReservas(this.desde, this.limit).subscribe((eventos) => {
      this.eventos = eventos;
      console.log(this.eventos);
    });
  }

  conmutaTarget(target) {
     switch (target) {
       case 'noticias':
         this.target = this.noticias;
         this.totalRegistros = this._noticiasService.totalRegistroDeNoticias;
         this.desde = 0;
         break;
         case 'usuarios':
         this.target = this.usuarios;
         this.totalRegistros = this._usuarioService.totalRegistrosDeUsuarios;
         this.desde = 0;
         break;
         case 'programas':
         console.log(this.programas);
         this.target = this.programas;
         this.totalRegistros = this._programaService.totalRegistrosDeProgramas;
         this.desde = 0;
         break;
         case 'eventos':
        //  console.log(this.eventos);
         this.target = this.eventos;
         this.totalRegistros = this._ocupacionService.totalReservas;
         this.desde = 0;
         break;
         case 'redonda':
        //  console.log('redonda');
         this.target = this.redonda;
        //  console.log(this.target);
        //  console.log(this.redonda);
         this.getFiles();
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
        if (this._usuarioService.usuario.role !== 'ADMIN_ROLE') {
          return;
        }
         if (userID === this._usuarioService.usuario._id) {
            this.popupConfirm(
              'No puede borrar su usuario',
              'No se permite la autodestrucción',
              'error'
             );

             return;
         }
         this._usuarioService.deleteUser(userID)
              .subscribe((res: any) => {
                console.log(res);
                this.popupConfirm(
                  'Eliminado!',
                  'El usuario ha sido eliminado',
                  'success'
                );
                this._programaService.deleteUserFromPrograma(userID).subscribe((resp: any) => console.log(resp));
                this.getNewInf('Usuarios').then(() => {
                  this.target = this.usuarios;
                });
              });
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
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
        return;
    }
    if (desde < 0 ) {
        return;
    }
    this.desde += valor;
    console.log(this.desde);
    switch (true) {
      case this.target === this.noticias:
        this.getNewInf('Noticias').then(() => {
          this.target = this.noticias;
        });
      break;
      case this.target === this.programas:
        this.getNewInf('Programas').then(() => {
          this.target = this.programas;
        });
      break;
      case this.target === this.usuarios:
        this.getNewInf('Usuarios').then(() => {
          this.target = this.usuarios;
        });
      break;
      case this.target === this.eventos:
        this.getNewInf('Eventos').then(() => {
          this.target = this.eventos;
        });
      break;
      default:
      break;
    }
  }

  async getNewInf(componente) {
    console.log(componente);
    switch (componente) {
      case 'Noticias':
        const noticias = await this._noticiasService.getallNoticias(this.desde, this.limit).toPromise();
        this.noticias = noticias;

      break;
      case 'Programas':
        const programas = await this._programaService.obtenerProgramas(this.desde, this.limit).toPromise();
        this.programas = programas;

      break;
      case 'Usuarios':
        const usuarios = await this._usuarioService.getAllUsers(this.desde).toPromise();
        this.usuarios = usuarios;

      break;
      case 'Eventos':
        const eventos = await this._ocupacionService.getAllReservas(this.desde, this.limit).toPromise();
        this.eventos = eventos;

      break;
      default:
      break;
    }
  }

  updateUser( usuario: Usuario, password: string) {

    if ( password !== 'undefined') {
      usuario.password1 = password;
      usuario.password2 = password;
    }

    this.popupConfirm({
      title: 'Estás Seguro que desea actualizar el usuario?',
      text: 'Los cambios serán irreversibles',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar!',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        if (this._usuarioService.usuario.role !== 'ADMIN_ROLE') {
          return;
        }
        this._usuarioService.updateUser(usuario).subscribe((res: any) => {
          console.log(usuario);
          this.popupConfirm(
            'Actualizado',
            'El usuario no ha sido actualizado',
            'success'
          );
        });
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        this.popupConfirm(
          'Cancelado',
          'La acción ha sido eliminado',
          'error'
        );
        return;
      }
    });
  }

  enablePwdInput(event) {

    event.stopPropagation();
    event.preventDefault();
    if (this.clickOnPwd = 3) {
      const target = event.target.querySelector('input');
      if ( target !== null) {
        if (target.hasAttribute('disabled') ) {
          target.removeAttribute('disabled');
        }
      }
    }

  }

  eraseEvento(eventoID, index) {
    console.log(eventoID);
  console.log(index);
  this.popupConfirm({
    title: 'Estás Seguro que desea eliminar la reserva?',
    text: 'Los cambios no serán reversibles',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Eliminar!',
    cancelButtonText: 'Cancelar!',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this._ocupacionService.eraseReserva(eventoID).subscribe((data: any) => {
        this.popupConfirm(
          'Borrado!',
          'La reserva ha sido eliminada',
          'success'
        );
        this.eventos.splice(index, 1);
      });
    } else if (
      // Read more about handling dismissals
      result.dismiss === Swal.DismissReason.cancel
    ) {
      this.popupConfirm(
        'Cancelado',
        'La reserva no ha sido eliminada',
        'error'
      );
      return;
    }
  });
  }

  seleccionImagen(archivo: File) {
    console.log(archivo);
    if ( archivo.type.indexOf('pdf') < 0 ) {
      Swal('Solo pdfs', 'El archivo seleccionado no es una imagen pdf', 'error');
      archivo = null;
      return;
    }

    this.pdfRedonda = archivo;
  }

  subirPdf() {

    if (this.pdfRedonda !== undefined && this.inicioAgenda !== undefined && this.finAgenda !== undefined ) {
      this.pdfRedonda.inicioagenda = this.inicioAgenda;
      this.pdfRedonda.finagenda = this.finAgenda;
      console.log(this.pdfRedonda);
      return this._programaService.subirImagen(this.pdfRedonda, 'redonda').then(() => {
        Swal('Redonda Subida', 'Redonda se ha subido correctamente', 'success');
      });
    } else {
      Swal('PDF', 'No ha seleccionado ningún archivo pdf o no ha establecido una fecha de evento', 'error');
      return;
    }
  }

  getFiles() {
    this._adminService.downloadFiles().subscribe((res: any) => {
      console.log(res, 'RES');
      this.files = res;
      });
    }

}
