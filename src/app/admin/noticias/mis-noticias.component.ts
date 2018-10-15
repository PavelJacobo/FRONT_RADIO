import { Component, OnInit } from '@angular/core';
import { Noticia } from '../../modelos/noticia.modelo';
import { NoticiaService } from '../../services/admin/noticia.service';
import { UsuarioService } from '../../services/admin/usuario.service';
@Component({
  selector: 'app-mis-noticias',
  templateUrl: './mis-noticias.component.html',
  styleUrls: ['noticias.component.css']
})
export class MisNoticiasComponent implements OnInit {

  public noticias: Noticia[];
  constructor( public _usuarioService: UsuarioService, public _noticiaService: NoticiaService ) {
    this.getMisNoticias();
  }

  ngOnInit() {
  }

  eraseNotica(id) {
    this._noticiaService.removeNoticia(id, this._usuarioService.token).subscribe((res: any) => {
      this.getMisNoticias();
    });
  }

  updateNoticia (id) {

  }

  getMisNoticias() {

    this._noticiaService.getUsersNoticias(this._usuarioService.usuario._id, this._usuarioService.token)
     .subscribe((noticias: any) => {
       this.noticias = noticias;
       console.log(this.noticias);
      });
  }


}
