import { Component, OnInit, Input } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { Usuario } from '../../modelos/usuario.modelo';
import { UsuarioService } from '../../services/admin/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public usuario: Usuario;
  @Input() sideBar: SidebarComponent;

  click() {
    this.sideBar.toggle();
  }

  constructor(public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }


}
