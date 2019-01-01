import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../services/admin/usuario.service';
import { Usuario } from 'src/app/modelos/modelo.index';

@Component({
  selector: 'app-detalle-publico-user',
  templateUrl: './detalle-publico-user.component.html',
  styleUrls: ['./detalle-publico-user.component.css']
})
export class DetallePublicoUserComponent implements OnInit {
 private userId: String;
 public usuario: Usuario;
  constructor(private _route: ActivatedRoute, public _usuarioService: UsuarioService) {
    this.userId = this._route.snapshot.params['id'];

   }

  ngOnInit() {
    this._usuarioService.findUser([this.userId]).subscribe((usuario: any) => {
      this.usuario = usuario[0];
      console.log(this.usuario);
    });
  }

}
